package space.datahub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import space.datahub.domain.Mission;
import space.datahub.domain.Product;
import space.datahub.repo.ProductRepo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {
    private final ProductRepo productRepo;

    @Autowired
    public ProductController(ProductRepo productRepo){
        this.productRepo = productRepo;
    }

    @GetMapping
    public List<Product> list(){
        return productRepo.findAll();
    }

    @GetMapping("{id}")
    public Product getOne(@PathVariable("id") Product product){
        return product;
    }

    @PostMapping
    public Product create(@RequestBody Product product){
        product.setName(product.getMission().getName());
        product.setCreationDate(LocalDate.now());
        product.setOrdered(false);
        return productRepo.save(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Product product){
        productRepo.delete(product);
    }

    @GetMapping("/filter/name")
    public Iterable<Product> byName(@RequestParam String name){
        Iterable<Product> products = null;
        if(name != null && !name.isEmpty()) {
            products = productRepo.findByName(name);
            return products;
        }
        return null;
    }

    @GetMapping("/filter/type")
    public Iterable<Product> byType(@RequestParam String type){
        Iterable<Product> products = null;
        if(type != null && !type.isEmpty()) {
            products = productRepo.findByMissionType(type);
            return products;
        }
        return null;
    }

    @PostMapping("/order")
    public List<Product> order(@RequestParam List<Long> table){

        List<Product> products;
        List<Product> tmpProducts = new ArrayList<>();
        for (long tmp : table) {
            products = productRepo.findById(tmp);
            products.get(0).setOrdered(true);
            tmpProducts.add(products.get(0));
        }
        return tmpProducts;
    }
}
