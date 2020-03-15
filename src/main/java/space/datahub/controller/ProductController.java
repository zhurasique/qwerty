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

    // GET request for get all products in DB -> /api/product
    @GetMapping
    public List<Product> list(){
        return productRepo.findAll();
    }

    // GET request for get one product in DB by ID -> /api/product
    @GetMapping("{id}")
    public Product getOne(@PathVariable("id") Product product){
        return product;
    }

    // POST request for create product -> api/product
    @PostMapping
    public Product create(@RequestBody Product product){
        // Product takes name for mission, which took him.
        product.setName(product.getMission().getName());

        // Product takes creation date from now.
        product.setCreationDate(LocalDate.now());

        // We set value false, because product wasn't ordered yet.
        product.setOrdered(false);
        return productRepo.save(product);
    }

    // DELETE request for delete product -> api/product
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Product product){
        productRepo.delete(product);
    }

    // GET request for search products by name -> api/product/filter/name?name=Mission-2
    @GetMapping("/filter/name")
    public Iterable<Product> byName(@RequestParam String name){
        Iterable<Product> products = null;
        if(name != null && !name.isEmpty()) {
            products = productRepo.findByName(name);
            return products;
        }
        return null;
    }

    // GET request for search products by type -> api/product/filter/type?type=Panchromatic
    @GetMapping("/filter/type")
    public Iterable<Product> byType(@RequestParam String type){
        Iterable<Product> products = null;
        if(type != null && !type.isEmpty()) {
            products = productRepo.findByMissionType(type);
            return products;
        }
        return null;
    }

    // POST request for ordering products
    @PostMapping("/order")
    public List<Product> order(@RequestParam List<Long> table){

        List<Product> products;
        List<Product> tmpProducts = new ArrayList<>();
        for (long tmp : table) {
            products = productRepo.findById(tmp);
            // Product was ordered here, so we changed the value to a true.
            products.get(0).setOrdered(true);
            tmpProducts.add(products.get(0));
        }
        return tmpProducts;
    }
}
