package pro.patrykkrawczyk.edziennik.web.rest;

import com.codahale.metrics.annotation.Timed;
import pro.patrykkrawczyk.edziennik.domain.Wiadomosci;

import pro.patrykkrawczyk.edziennik.repository.WiadomosciRepository;
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
 * REST controller for managing Wiadomosci.
 */
@RestController
@RequestMapping("/api")
public class WiadomosciResource {

    private final Logger log = LoggerFactory.getLogger(WiadomosciResource.class);

    private static final String ENTITY_NAME = "wiadomosci";

    private final WiadomosciRepository wiadomosciRepository;

    public WiadomosciResource(WiadomosciRepository wiadomosciRepository) {
        this.wiadomosciRepository = wiadomosciRepository;
    }

    /**
     * POST  /wiadomoscis : Create a new wiadomosci.
     *
     * @param wiadomosci the wiadomosci to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wiadomosci, or with status 400 (Bad Request) if the wiadomosci has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wiadomoscis")
    @Timed
    public ResponseEntity<Wiadomosci> createWiadomosci(@RequestBody Wiadomosci wiadomosci) throws URISyntaxException {
        log.debug("REST request to save Wiadomosci : {}", wiadomosci);
        if (wiadomosci.getId() != null) {
            throw new BadRequestAlertException("A new wiadomosci cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Wiadomosci result = wiadomosciRepository.save(wiadomosci);
        return ResponseEntity.created(new URI("/api/wiadomoscis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wiadomoscis : Updates an existing wiadomosci.
     *
     * @param wiadomosci the wiadomosci to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wiadomosci,
     * or with status 400 (Bad Request) if the wiadomosci is not valid,
     * or with status 500 (Internal Server Error) if the wiadomosci couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wiadomoscis")
    @Timed
    public ResponseEntity<Wiadomosci> updateWiadomosci(@RequestBody Wiadomosci wiadomosci) throws URISyntaxException {
        log.debug("REST request to update Wiadomosci : {}", wiadomosci);
        if (wiadomosci.getId() == null) {
            return createWiadomosci(wiadomosci);
        }
        Wiadomosci result = wiadomosciRepository.save(wiadomosci);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wiadomosci.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wiadomoscis : get all the wiadomoscis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wiadomoscis in body
     */
    @GetMapping("/wiadomoscis")
    @Timed
    public List<Wiadomosci> getAllWiadomoscis() {
        log.debug("REST request to get all Wiadomoscis");
        return wiadomosciRepository.findAll();
        }

    /**
     * GET  /wiadomoscis/:id : get the "id" wiadomosci.
     *
     * @param id the id of the wiadomosci to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wiadomosci, or with status 404 (Not Found)
     */
    @GetMapping("/wiadomoscis/{id}")
    @Timed
    public ResponseEntity<Wiadomosci> getWiadomosci(@PathVariable Long id) {
        log.debug("REST request to get Wiadomosci : {}", id);
        Wiadomosci wiadomosci = wiadomosciRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wiadomosci));
    }

    /**
     * DELETE  /wiadomoscis/:id : delete the "id" wiadomosci.
     *
     * @param id the id of the wiadomosci to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wiadomoscis/{id}")
    @Timed
    public ResponseEntity<Void> deleteWiadomosci(@PathVariable Long id) {
        log.debug("REST request to delete Wiadomosci : {}", id);
        wiadomosciRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
