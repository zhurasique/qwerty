package space.datahub.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import space.datahub.domain.Product;
import space.datahub.repo.ProductRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("product")
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
        product.setCreationDate(LocalDateTime.now());
        return productRepo.save(product);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Product product){
        productRepo.delete(product);
    }

    @GetMapping("/filter")
    public Iterable<Product> add(@RequestParam String filter){
        Iterable<Product> products = null;
        if(filter != null && !filter.isEmpty()) {
            products = productRepo.findByName(filter);
            return products;
        }
        return null;
    }

    @GetMapping("/order")
    public List<Product> order(@RequestParam List<Long> table){
        List<Product> products;
        List<Product> tmpProducts = new ArrayList<>();
        for (long tmp : table) {
            products = productRepo.findById(tmp);
            tmpProducts.add(products.get(0));
        }
        return tmpProducts;
    }
}
