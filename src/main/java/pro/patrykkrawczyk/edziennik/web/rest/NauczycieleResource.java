package pro.patrykkrawczyk.edziennik.web.rest;

import com.codahale.metrics.annotation.Timed;
import pro.patrykkrawczyk.edziennik.domain.Nauczyciele;

import pro.patrykkrawczyk.edziennik.repository.NauczycieleRepository;
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
 * REST controller for managing Nauczyciele.
 */
@RestController
@RequestMapping("/api")
public class NauczycieleResource {

    private final Logger log = LoggerFactory.getLogger(NauczycieleResource.class);

    private static final String ENTITY_NAME = "nauczyciele";

    private final NauczycieleRepository nauczycieleRepository;

    public NauczycieleResource(NauczycieleRepository nauczycieleRepository) {
        this.nauczycieleRepository = nauczycieleRepository;
    }

    /**
     * POST  /nauczycieles : Create a new nauczyciele.
     *
     * @param nauczyciele the nauczyciele to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nauczyciele, or with status 400 (Bad Request) if the nauczyciele has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nauczycieles")
    @Timed
    public ResponseEntity<Nauczyciele> createNauczyciele(@RequestBody Nauczyciele nauczyciele) throws URISyntaxException {
        log.debug("REST request to save Nauczyciele : {}", nauczyciele);
        if (nauczyciele.getId() != null) {
            throw new BadRequestAlertException("A new nauczyciele cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nauczyciele result = nauczycieleRepository.save(nauczyciele);
        return ResponseEntity.created(new URI("/api/nauczycieles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nauczycieles : Updates an existing nauczyciele.
     *
     * @param nauczyciele the nauczyciele to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nauczyciele,
     * or with status 400 (Bad Request) if the nauczyciele is not valid,
     * or with status 500 (Internal Server Error) if the nauczyciele couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nauczycieles")
    @Timed
    public ResponseEntity<Nauczyciele> updateNauczyciele(@RequestBody Nauczyciele nauczyciele) throws URISyntaxException {
        log.debug("REST request to update Nauczyciele : {}", nauczyciele);
        if (nauczyciele.getId() == null) {
            return createNauczyciele(nauczyciele);
        }
        Nauczyciele result = nauczycieleRepository.save(nauczyciele);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nauczyciele.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nauczycieles : get all the nauczycieles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nauczycieles in body
     */
    @GetMapping("/nauczycieles")
    @Timed
    public List<Nauczyciele> getAllNauczycieles() {
        log.debug("REST request to get all Nauczycieles");
        return nauczycieleRepository.findAll();
        }

    /**
     * GET  /nauczycieles/:id : get the "id" nauczyciele.
     *
     * @param id the id of the nauczyciele to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nauczyciele, or with status 404 (Not Found)
     */
    @GetMapping("/nauczycieles/{id}")
    @Timed
    public ResponseEntity<Nauczyciele> getNauczyciele(@PathVariable Long id) {
        log.debug("REST request to get Nauczyciele : {}", id);
        Nauczyciele nauczyciele = nauczycieleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nauczyciele));
    }

    /**
     * DELETE  /nauczycieles/:id : delete the "id" nauczyciele.
     *
     * @param id the id of the nauczyciele to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nauczycieles/{id}")
    @Timed
    public ResponseEntity<Void> deleteNauczyciele(@PathVariable Long id) {
        log.debug("REST request to delete Nauczyciele : {}", id);
        nauczycieleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
