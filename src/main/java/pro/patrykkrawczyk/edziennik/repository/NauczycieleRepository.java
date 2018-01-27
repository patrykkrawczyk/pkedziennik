package pro.patrykkrawczyk.edziennik.repository;

import pro.patrykkrawczyk.edziennik.domain.Nauczyciele;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Nauczyciele entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NauczycieleRepository extends JpaRepository<Nauczyciele, Long> {

}
