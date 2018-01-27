package pro.patrykkrawczyk.edziennik.web.rest;

import pro.patrykkrawczyk.edziennik.PkedziennikApp;

import pro.patrykkrawczyk.edziennik.domain.Nauczyciele;
import pro.patrykkrawczyk.edziennik.repository.NauczycieleRepository;
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
 * Test class for the NauczycieleResource REST controller.
 *
 * @see NauczycieleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PkedziennikApp.class)
public class NauczycieleResourceIntTest {

    private static final String DEFAULT_IMIE = "AAAAAAAAAA";
    private static final String UPDATED_IMIE = "BBBBBBBBBB";

    private static final String DEFAULT_NAZWISKO = "AAAAAAAAAA";
    private static final String UPDATED_NAZWISKO = "BBBBBBBBBB";

    private static final String DEFAULT_PESEL = "AAAAAAAAAA";
    private static final String UPDATED_PESEL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFON = "AAAAAAAAAA";
    private static final String UPDATED_TELEFON = "BBBBBBBBBB";

    @Autowired
    private NauczycieleRepository nauczycieleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNauczycieleMockMvc;

    private Nauczyciele nauczyciele;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NauczycieleResource nauczycieleResource = new NauczycieleResource(nauczycieleRepository);
        this.restNauczycieleMockMvc = MockMvcBuilders.standaloneSetup(nauczycieleResource)
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
    public static Nauczyciele createEntity(EntityManager em) {
        Nauczyciele nauczyciele = new Nauczyciele()
            .imie(DEFAULT_IMIE)
            .nazwisko(DEFAULT_NAZWISKO)
            .pesel(DEFAULT_PESEL)
            .telefon(DEFAULT_TELEFON);
        return nauczyciele;
    }

    @Before
    public void initTest() {
        nauczyciele = createEntity(em);
    }

    @Test
    @Transactional
    public void createNauczyciele() throws Exception {
        int databaseSizeBeforeCreate = nauczycieleRepository.findAll().size();

        // Create the Nauczyciele
        restNauczycieleMockMvc.perform(post("/api/nauczycieles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciele)))
            .andExpect(status().isCreated());

        // Validate the Nauczyciele in the database
        List<Nauczyciele> nauczycieleList = nauczycieleRepository.findAll();
        assertThat(nauczycieleList).hasSize(databaseSizeBeforeCreate + 1);
        Nauczyciele testNauczyciele = nauczycieleList.get(nauczycieleList.size() - 1);
        assertThat(testNauczyciele.getImie()).isEqualTo(DEFAULT_IMIE);
        assertThat(testNauczyciele.getNazwisko()).isEqualTo(DEFAULT_NAZWISKO);
        assertThat(testNauczyciele.getPesel()).isEqualTo(DEFAULT_PESEL);
        assertThat(testNauczyciele.getTelefon()).isEqualTo(DEFAULT_TELEFON);
    }

    @Test
    @Transactional
    public void createNauczycieleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nauczycieleRepository.findAll().size();

        // Create the Nauczyciele with an existing ID
        nauczyciele.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNauczycieleMockMvc.perform(post("/api/nauczycieles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciele)))
            .andExpect(status().isBadRequest());

        // Validate the Nauczyciele in the database
        List<Nauczyciele> nauczycieleList = nauczycieleRepository.findAll();
        assertThat(nauczycieleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNauczycieles() throws Exception {
        // Initialize the database
        nauczycieleRepository.saveAndFlush(nauczyciele);

        // Get all the nauczycieleList
        restNauczycieleMockMvc.perform(get("/api/nauczycieles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nauczyciele.getId().intValue())))
            .andExpect(jsonPath("$.[*].imie").value(hasItem(DEFAULT_IMIE.toString())))
            .andExpect(jsonPath("$.[*].nazwisko").value(hasItem(DEFAULT_NAZWISKO.toString())))
            .andExpect(jsonPath("$.[*].pesel").value(hasItem(DEFAULT_PESEL.toString())))
            .andExpect(jsonPath("$.[*].telefon").value(hasItem(DEFAULT_TELEFON.toString())));
    }

    @Test
    @Transactional
    public void getNauczyciele() throws Exception {
        // Initialize the database
        nauczycieleRepository.saveAndFlush(nauczyciele);

        // Get the nauczyciele
        restNauczycieleMockMvc.perform(get("/api/nauczycieles/{id}", nauczyciele.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nauczyciele.getId().intValue()))
            .andExpect(jsonPath("$.imie").value(DEFAULT_IMIE.toString()))
            .andExpect(jsonPath("$.nazwisko").value(DEFAULT_NAZWISKO.toString()))
            .andExpect(jsonPath("$.pesel").value(DEFAULT_PESEL.toString()))
            .andExpect(jsonPath("$.telefon").value(DEFAULT_TELEFON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNauczyciele() throws Exception {
        // Get the nauczyciele
        restNauczycieleMockMvc.perform(get("/api/nauczycieles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNauczyciele() throws Exception {
        // Initialize the database
        nauczycieleRepository.saveAndFlush(nauczyciele);
        int databaseSizeBeforeUpdate = nauczycieleRepository.findAll().size();

        // Update the nauczyciele
        Nauczyciele updatedNauczyciele = nauczycieleRepository.findOne(nauczyciele.getId());
        // Disconnect from session so that the updates on updatedNauczyciele are not directly saved in db
        em.detach(updatedNauczyciele);
        updatedNauczyciele
            .imie(UPDATED_IMIE)
            .nazwisko(UPDATED_NAZWISKO)
            .pesel(UPDATED_PESEL)
            .telefon(UPDATED_TELEFON);

        restNauczycieleMockMvc.perform(put("/api/nauczycieles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNauczyciele)))
            .andExpect(status().isOk());

        // Validate the Nauczyciele in the database
        List<Nauczyciele> nauczycieleList = nauczycieleRepository.findAll();
        assertThat(nauczycieleList).hasSize(databaseSizeBeforeUpdate);
        Nauczyciele testNauczyciele = nauczycieleList.get(nauczycieleList.size() - 1);
        assertThat(testNauczyciele.getImie()).isEqualTo(UPDATED_IMIE);
        assertThat(testNauczyciele.getNazwisko()).isEqualTo(UPDATED_NAZWISKO);
        assertThat(testNauczyciele.getPesel()).isEqualTo(UPDATED_PESEL);
        assertThat(testNauczyciele.getTelefon()).isEqualTo(UPDATED_TELEFON);
    }

    @Test
    @Transactional
    public void updateNonExistingNauczyciele() throws Exception {
        int databaseSizeBeforeUpdate = nauczycieleRepository.findAll().size();

        // Create the Nauczyciele

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNauczycieleMockMvc.perform(put("/api/nauczycieles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciele)))
            .andExpect(status().isCreated());

        // Validate the Nauczyciele in the database
        List<Nauczyciele> nauczycieleList = nauczycieleRepository.findAll();
        assertThat(nauczycieleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNauczyciele() throws Exception {
        // Initialize the database
        nauczycieleRepository.saveAndFlush(nauczyciele);
        int databaseSizeBeforeDelete = nauczycieleRepository.findAll().size();

        // Get the nauczyciele
        restNauczycieleMockMvc.perform(delete("/api/nauczycieles/{id}", nauczyciele.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nauczyciele> nauczycieleList = nauczycieleRepository.findAll();
        assertThat(nauczycieleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nauczyciele.class);
        Nauczyciele nauczyciele1 = new Nauczyciele();
        nauczyciele1.setId(1L);
        Nauczyciele nauczyciele2 = new Nauczyciele();
        nauczyciele2.setId(nauczyciele1.getId());
        assertThat(nauczyciele1).isEqualTo(nauczyciele2);
        nauczyciele2.setId(2L);
        assertThat(nauczyciele1).isNotEqualTo(nauczyciele2);
        nauczyciele1.setId(null);
        assertThat(nauczyciele1).isNotEqualTo(nauczyciele2);
    }
}
