package space.datahub.repo;

import space.datahub.domain.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepo extends JpaRepository<Mission, Long> {
}
