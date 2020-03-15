package space.datahub.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.datahub.domain.User;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
