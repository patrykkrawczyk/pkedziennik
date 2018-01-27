package pro.patrykkrawczyk.edziennik.repository;

import pro.patrykkrawczyk.edziennik.domain.Sala;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Sala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {

}
