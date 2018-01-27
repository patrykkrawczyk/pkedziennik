package pro.patrykkrawczyk.edziennik.web.rest;

import com.codahale.metrics.annotation.Timed;
import pro.patrykkrawczyk.edziennik.domain.Zasoby;

import pro.patrykkrawczyk.edziennik.repository.ZasobyRepository;
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
 * REST controller for managing Zasoby.
 */
@RestController
@RequestMapping("/api")
public class ZasobyResource {

    private final Logger log = LoggerFactory.getLogger(ZasobyResource.class);

    private static final String ENTITY_NAME = "zasoby";

    private final ZasobyRepository zasobyRepository;

    public ZasobyResource(ZasobyRepository zasobyRepository) {
        this.zasobyRepository = zasobyRepository;
    }

    /**
     * POST  /zasobies : Create a new zasoby.
     *
     * @param zasoby the zasoby to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zasoby, or with status 400 (Bad Request) if the zasoby has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/zasobies")
    @Timed
    public ResponseEntity<Zasoby> createZasoby(@RequestBody Zasoby zasoby) throws URISyntaxException {
        log.debug("REST request to save Zasoby : {}", zasoby);
        if (zasoby.getId() != null) {
            throw new BadRequestAlertException("A new zasoby cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Zasoby result = zasobyRepository.save(zasoby);
        return ResponseEntity.created(new URI("/api/zasobies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /zasobies : Updates an existing zasoby.
     *
     * @param zasoby the zasoby to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zasoby,
     * or with status 400 (Bad Request) if the zasoby is not valid,
     * or with status 500 (Internal Server Error) if the zasoby couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/zasobies")
    @Timed
    public ResponseEntity<Zasoby> updateZasoby(@RequestBody Zasoby zasoby) throws URISyntaxException {
        log.debug("REST request to update Zasoby : {}", zasoby);
        if (zasoby.getId() == null) {
            return createZasoby(zasoby);
        }
        Zasoby result = zasobyRepository.save(zasoby);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zasoby.getId().toString()))
            .body(result);
    }

    /**
     * GET  /zasobies : get all the zasobies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of zasobies in body
     */
    @GetMapping("/zasobies")
    @Timed
    public List<Zasoby> getAllZasobies() {
        log.debug("REST request to get all Zasobies");
        return zasobyRepository.findAll();
        }

    /**
     * GET  /zasobies/:id : get the "id" zasoby.
     *
     * @param id the id of the zasoby to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zasoby, or with status 404 (Not Found)
     */
    @GetMapping("/zasobies/{id}")
    @Timed
    public ResponseEntity<Zasoby> getZasoby(@PathVariable Long id) {
        log.debug("REST request to get Zasoby : {}", id);
        Zasoby zasoby = zasobyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(zasoby));
    }

    /**
     * DELETE  /zasobies/:id : delete the "id" zasoby.
     *
     * @param id the id of the zasoby to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/zasobies/{id}")
    @Timed
    public ResponseEntity<Void> deleteZasoby(@PathVariable Long id) {
        log.debug("REST request to delete Zasoby : {}", id);
        zasobyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
