package pro.patrykkrawczyk.edziennik.repository;

import pro.patrykkrawczyk.edziennik.domain.Zasoby;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Zasoby entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZasobyRepository extends JpaRepository<Zasoby, Long> {

}
