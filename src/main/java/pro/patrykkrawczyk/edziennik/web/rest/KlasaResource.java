package pro.patrykkrawczyk.edziennik.web.rest;

import com.codahale.metrics.annotation.Timed;
import pro.patrykkrawczyk.edziennik.domain.Klasa;

import pro.patrykkrawczyk.edziennik.repository.KlasaRepository;
import pro.patrykkrawczyk.edziennik.web.rest.errors.BadRequestAlertException;
import pro.patrykkrawczyk.edziennik.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Klasa.
 */
@RestController
@RequestMapping("/api")
public class KlasaResource {

    private final Logger log = LoggerFactory.getLogger(KlasaResource.class);

    private static final String ENTITY_NAME = "klasa";

    private final KlasaRepository klasaRepository;

    public KlasaResource(KlasaRepository klasaRepository) {
        this.klasaRepository = klasaRepository;
    }

    /**
     * POST  /klasas : Create a new klasa.
     *
     * @param klasa the klasa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new klasa, or with status 400 (Bad Request) if the klasa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/klasas")
    @Timed
    public ResponseEntity<Klasa> createKlasa(@RequestBody Klasa klasa) throws URISyntaxException {
        log.debug("REST request to save Klasa : {}", klasa);
        if (klasa.getId() != null) {
            throw new BadRequestAlertException("A new klasa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Klasa result = klasaRepository.save(klasa);
        return ResponseEntity.created(new URI("/api/klasas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /klasas : Updates an existing klasa.
     *
     * @param klasa the klasa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated klasa,
     * or with status 400 (Bad Request) if the klasa is not valid,
     * or with status 500 (Internal Server Error) if the klasa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/klasas")
    @Timed
    public ResponseEntity<Klasa> updateKlasa(@RequestBody Klasa klasa) throws URISyntaxException {
        log.debug("REST request to update Klasa : {}", klasa);
        if (klasa.getId() == null) {
            return createKlasa(klasa);
        }
        Klasa result = klasaRepository.save(klasa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, klasa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /klasas : get all the klasas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of klasas in body
     */
    @GetMapping("/klasas")
    @Timed
    public List<Klasa> getAllKlasas() {
        log.debug("REST request to get all Klasas");
        return klasaRepository.findAll();
        }

    /**
     * GET  /klasas/:id : get the "id" klasa.
     *
     * @param id the id of the klasa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the klasa, or with status 404 (Not Found)
     */
    @GetMapping("/klasas/{id}")
    @Timed
    public ResponseEntity<Klasa> getKlasa(@PathVariable Long id) {
        log.debug("REST request to get Klasa : {}", id);
        Klasa klasa = klasaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(klasa));
    }

    /**
     * DELETE  /klasas/:id : delete the "id" klasa.
     *
     * @param id the id of the klasa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/klasas/{id}")
    @Timed
    public ResponseEntity<Void> deleteKlasa(@PathVariable Long id) {
        log.debug("REST request to delete Klasa : {}", id);
        klasaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
