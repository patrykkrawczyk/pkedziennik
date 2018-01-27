package pro.patrykkrawczyk.edziennik.web.rest;

import pro.patrykkrawczyk.edziennik.PkedziennikApp;

import pro.patrykkrawczyk.edziennik.domain.Wiadomosci;
import pro.patrykkrawczyk.edziennik.repository.WiadomosciRepository;
import pro.patrykkrawczyk.edziennik.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static pro.patrykkrawczyk.edziennik.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WiadomosciResource REST controller.
 *
 * @see WiadomosciResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PkedziennikApp.class)
public class WiadomosciResourceIntTest {

    private static final String DEFAULT_ODKIEDY = "AAAAAAAAAA";
    private static final String UPDATED_ODKIEDY = "BBBBBBBBBB";

    private static final String DEFAULT_DOKIEDY = "AAAAAAAAAA";
    private static final String UPDATED_DOKIEDY = "BBBBBBBBBB";

    private static final String DEFAULT_TRESC = "AAAAAAAAAA";
    private static final String UPDATED_TRESC = "BBBBBBBBBB";

    @Autowired
    private WiadomosciRepository wiadomosciRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWiadomosciMockMvc;

    private Wiadomosci wiadomosci;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WiadomosciResource wiadomosciResource = new WiadomosciResource(wiadomosciRepository);
        this.restWiadomosciMockMvc = MockMvcBuilders.standaloneSetup(wiadomosciResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Wiadomosci createEntity(EntityManager em) {
        Wiadomosci wiadomosci = new Wiadomosci()
            .odkiedy(DEFAULT_ODKIEDY)
            .dokiedy(DEFAULT_DOKIEDY)
            .tresc(DEFAULT_TRESC);
        return wiadomosci;
    }

    @Before
    public void initTest() {
        wiadomosci = createEntity(em);
    }

    @Test
    @Transactional
    public void createWiadomosci() throws Exception {
        int databaseSizeBeforeCreate = wiadomosciRepository.findAll().size();

        // Create the Wiadomosci
        restWiadomosciMockMvc.perform(post("/api/wiadomoscis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wiadomosci)))
            .andExpect(status().isCreated());

        // Validate the Wiadomosci in the database
        List<Wiadomosci> wiadomosciList = wiadomosciRepository.findAll();
        assertThat(wiadomosciList).hasSize(databaseSizeBeforeCreate + 1);
        Wiadomosci testWiadomosci = wiadomosciList.get(wiadomosciList.size() - 1);
        assertThat(testWiadomosci.getOdkiedy()).isEqualTo(DEFAULT_ODKIEDY);
        assertThat(testWiadomosci.getDokiedy()).isEqualTo(DEFAULT_DOKIEDY);
        assertThat(testWiadomosci.getTresc()).isEqualTo(DEFAULT_TRESC);
    }

    @Test
    @Transactional
    public void createWiadomosciWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wiadomosciRepository.findAll().size();

        // Create the Wiadomosci with an existing ID
        wiadomosci.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWiadomosciMockMvc.perform(post("/api/wiadomoscis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wiadomosci)))
            .andExpect(status().isBadRequest());

        // Validate the Wiadomosci in the database
        List<Wiadomosci> wiadomosciList = wiadomosciRepository.findAll();
        assertThat(wiadomosciList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWiadomoscis() throws Exception {
        // Initialize the database
        wiadomosciRepository.saveAndFlush(wiadomosci);

        // Get all the wiadomosciList
        restWiadomosciMockMvc.perform(get("/api/wiadomoscis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wiadomosci.getId().intValue())))
            .andExpect(jsonPath("$.[*].odkiedy").value(hasItem(DEFAULT_ODKIEDY.toString())))
            .andExpect(jsonPath("$.[*].dokiedy").value(hasItem(DEFAULT_DOKIEDY.toString())))
            .andExpect(jsonPath("$.[*].tresc").value(hasItem(DEFAULT_TRESC.toString())));
    }

    @Test
    @Transactional
    public void getWiadomosci() throws Exception {
        // Initialize the database
        wiadomosciRepository.saveAndFlush(wiadomosci);

        // Get the wiadomosci
        restWiadomosciMockMvc.perform(get("/api/wiadomoscis/{id}", wiadomosci.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wiadomosci.getId().intValue()))
            .andExpect(jsonPath("$.odkiedy").value(DEFAULT_ODKIEDY.toString()))
            .andExpect(jsonPath("$.dokiedy").value(DEFAULT_DOKIEDY.toString()))
            .andExpect(jsonPath("$.tresc").value(DEFAULT_TRESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWiadomosci() throws Exception {
        // Get the wiadomosci
        restWiadomosciMockMvc.perform(get("/api/wiadomoscis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWiadomosci() throws Exception {
        // Initialize the database
        wiadomosciRepository.saveAndFlush(wiadomosci);
        int databaseSizeBeforeUpdate = wiadomosciRepository.findAll().size();

        // Update the wiadomosci
        Wiadomosci updatedWiadomosci = wiadomosciRepository.findOne(wiadomosci.getId());
        // Disconnect from session so that the updates on updatedWiadomosci are not directly saved in db
        em.detach(updatedWiadomosci);
        updatedWiadomosci
            .odkiedy(UPDATED_ODKIEDY)
            .dokiedy(UPDATED_DOKIEDY)
            .tresc(UPDATED_TRESC);

        restWiadomosciMockMvc.perform(put("/api/wiadomoscis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWiadomosci)))
            .andExpect(status().isOk());

        // Validate the Wiadomosci in the database
        List<Wiadomosci> wiadomosciList = wiadomosciRepository.findAll();
        assertThat(wiadomosciList).hasSize(databaseSizeBeforeUpdate);
        Wiadomosci testWiadomosci = wiadomosciList.get(wiadomosciList.size() - 1);
        assertThat(testWiadomosci.getOdkiedy()).isEqualTo(UPDATED_ODKIEDY);
        assertThat(testWiadomosci.getDokiedy()).isEqualTo(UPDATED_DOKIEDY);
        assertThat(testWiadomosci.getTresc()).isEqualTo(UPDATED_TRESC);
    }

    @Test
    @Transactional
    public void updateNonExistingWiadomosci() throws Exception {
        int databaseSizeBeforeUpdate = wiadomosciRepository.findAll().size();

        // Create the Wiadomosci

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWiadomosciMockMvc.perform(put("/api/wiadomoscis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wiadomosci)))
            .andExpect(status().isCreated());

        // Validate the Wiadomosci in the database
        List<Wiadomosci> wiadomosciList = wiadomosciRepository.findAll();
        assertThat(wiadomosciList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWiadomosci() throws Exception {
        // Initialize the database
        wiadomosciRepository.saveAndFlush(wiadomosci);
        int databaseSizeBeforeDelete = wiadomosciRepository.findAll().size();

        // Get the wiadomosci
        restWiadomosciMockMvc.perform(delete("/api/wiadomoscis/{id}", wiadomosci.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Wiadomosci> wiadomosciList = wiadomosciRepository.findAll();
        assertThat(wiadomosciList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Wiadomosci.class);
        Wiadomosci wiadomosci1 = new Wiadomosci();
        wiadomosci1.setId(1L);
        Wiadomosci wiadomosci2 = new Wiadomosci();
        wiadomosci2.setId(wiadomosci1.getId());
        assertThat(wiadomosci1).isEqualTo(wiadomosci2);
        wiadomosci2.setId(2L);
        assertThat(wiadomosci1).isNotEqualTo(wiadomosci2);
        wiadomosci1.setId(null);
        assertThat(wiadomosci1).isNotEqualTo(wiadomosci2);
    }
}
