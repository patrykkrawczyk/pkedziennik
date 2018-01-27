package pro.patrykkrawczyk.edziennik.repository;

import pro.patrykkrawczyk.edziennik.domain.Wiadomosci;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Wiadomosci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WiadomosciRepository extends JpaRepository<Wiadomosci, Long> {

}
