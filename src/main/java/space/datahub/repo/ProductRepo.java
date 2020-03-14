package space.datahub.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import space.datahub.domain.Product;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);
    List<Product> findById(long id);
}
