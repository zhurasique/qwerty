package space.datahub.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import space.datahub.domain.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
}
