package pro.patrykkrawczyk.edziennik.repository;

import pro.patrykkrawczyk.edziennik.domain.Klasa;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Klasa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KlasaRepository extends JpaRepository<Klasa, Long> {

}
