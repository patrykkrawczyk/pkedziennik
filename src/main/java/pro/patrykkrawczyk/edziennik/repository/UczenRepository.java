package pro.patrykkrawczyk.edziennik.repository;

import pro.patrykkrawczyk.edziennik.domain.Uczen;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Uczen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UczenRepository extends JpaRepository<Uczen, Long> {

}
