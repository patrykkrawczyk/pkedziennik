package pro.patrykkrawczyk.edziennik.web.rest;

import pro.patrykkrawczyk.edziennik.PkedziennikApp;

import pro.patrykkrawczyk.edziennik.domain.Zasoby;
import pro.patrykkrawczyk.edziennik.repository.ZasobyRepository;
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
 * Test class for the ZasobyResource REST controller.
 *
 * @see ZasobyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PkedziennikApp.class)
public class ZasobyResourceIntTest {

    private static final String DEFAULT_NAZWA = "AAAAAAAAAA";
    private static final String UPDATED_NAZWA = "BBBBBBBBBB";

    private static final String DEFAULT_SALA = "AAAAAAAAAA";
    private static final String UPDATED_SALA = "BBBBBBBBBB";

    private static final String DEFAULT_ILOSC = "AAAAAAAAAA";
    private static final String UPDATED_ILOSC = "BBBBBBBBBB";

    @Autowired
    private ZasobyRepository zasobyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZasobyMockMvc;

    private Zasoby zasoby;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZasobyResource zasobyResource = new ZasobyResource(zasobyRepository);
        this.restZasobyMockMvc = MockMvcBuilders.standaloneSetup(zasobyResource)
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
    public static Zasoby createEntity(EntityManager em) {
        Zasoby zasoby = new Zasoby()
            .nazwa(DEFAULT_NAZWA)
            .sala(DEFAULT_SALA)
            .ilosc(DEFAULT_ILOSC);
        return zasoby;
    }

    @Before
    public void initTest() {
        zasoby = createEntity(em);
    }

    @Test
    @Transactional
    public void createZasoby() throws Exception {
        int databaseSizeBeforeCreate = zasobyRepository.findAll().size();

        // Create the Zasoby
        restZasobyMockMvc.perform(post("/api/zasobies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zasoby)))
            .andExpect(status().isCreated());

        // Validate the Zasoby in the database
        List<Zasoby> zasobyList = zasobyRepository.findAll();
        assertThat(zasobyList).hasSize(databaseSizeBeforeCreate + 1);
        Zasoby testZasoby = zasobyList.get(zasobyList.size() - 1);
        assertThat(testZasoby.getNazwa()).isEqualTo(DEFAULT_NAZWA);
        assertThat(testZasoby.getSala()).isEqualTo(DEFAULT_SALA);
        assertThat(testZasoby.getIlosc()).isEqualTo(DEFAULT_ILOSC);
    }

    @Test
    @Transactional
    public void createZasobyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zasobyRepository.findAll().size();

        // Create the Zasoby with an existing ID
        zasoby.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZasobyMockMvc.perform(post("/api/zasobies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zasoby)))
            .andExpect(status().isBadRequest());

        // Validate the Zasoby in the database
        List<Zasoby> zasobyList = zasobyRepository.findAll();
        assertThat(zasobyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllZasobies() throws Exception {
        // Initialize the database
        zasobyRepository.saveAndFlush(zasoby);

        // Get all the zasobyList
        restZasobyMockMvc.perform(get("/api/zasobies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zasoby.getId().intValue())))
            .andExpect(jsonPath("$.[*].nazwa").value(hasItem(DEFAULT_NAZWA.toString())))
            .andExpect(jsonPath("$.[*].sala").value(hasItem(DEFAULT_SALA.toString())))
            .andExpect(jsonPath("$.[*].ilosc").value(hasItem(DEFAULT_ILOSC.toString())));
    }

    @Test
    @Transactional
    public void getZasoby() throws Exception {
        // Initialize the database
        zasobyRepository.saveAndFlush(zasoby);

        // Get the zasoby
        restZasobyMockMvc.perform(get("/api/zasobies/{id}", zasoby.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zasoby.getId().intValue()))
            .andExpect(jsonPath("$.nazwa").value(DEFAULT_NAZWA.toString()))
            .andExpect(jsonPath("$.sala").value(DEFAULT_SALA.toString()))
            .andExpect(jsonPath("$.ilosc").value(DEFAULT_ILOSC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingZasoby() throws Exception {
        // Get the zasoby
        restZasobyMockMvc.perform(get("/api/zasobies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZasoby() throws Exception {
        // Initialize the database
        zasobyRepository.saveAndFlush(zasoby);
        int databaseSizeBeforeUpdate = zasobyRepository.findAll().size();

        // Update the zasoby
        Zasoby updatedZasoby = zasobyRepository.findOne(zasoby.getId());
        // Disconnect from session so that the updates on updatedZasoby are not directly saved in db
        em.detach(updatedZasoby);
        updatedZasoby
            .nazwa(UPDATED_NAZWA)
            .sala(UPDATED_SALA)
            .ilosc(UPDATED_ILOSC);

        restZasobyMockMvc.perform(put("/api/zasobies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedZasoby)))
            .andExpect(status().isOk());

        // Validate the Zasoby in the database
        List<Zasoby> zasobyList = zasobyRepository.findAll();
        assertThat(zasobyList).hasSize(databaseSizeBeforeUpdate);
        Zasoby testZasoby = zasobyList.get(zasobyList.size() - 1);
        assertThat(testZasoby.getNazwa()).isEqualTo(UPDATED_NAZWA);
        assertThat(testZasoby.getSala()).isEqualTo(UPDATED_SALA);
        assertThat(testZasoby.getIlosc()).isEqualTo(UPDATED_ILOSC);
    }

    @Test
    @Transactional
    public void updateNonExistingZasoby() throws Exception {
        int databaseSizeBeforeUpdate = zasobyRepository.findAll().size();

        // Create the Zasoby

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restZasobyMockMvc.perform(put("/api/zasobies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zasoby)))
            .andExpect(status().isCreated());

        // Validate the Zasoby in the database
        List<Zasoby> zasobyList = zasobyRepository.findAll();
        assertThat(zasobyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteZasoby() throws Exception {
        // Initialize the database
        zasobyRepository.saveAndFlush(zasoby);
        int databaseSizeBeforeDelete = zasobyRepository.findAll().size();

        // Get the zasoby
        restZasobyMockMvc.perform(delete("/api/zasobies/{id}", zasoby.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Zasoby> zasobyList = zasobyRepository.findAll();
        assertThat(zasobyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zasoby.class);
        Zasoby zasoby1 = new Zasoby();
        zasoby1.setId(1L);
        Zasoby zasoby2 = new Zasoby();
        zasoby2.setId(zasoby1.getId());
        assertThat(zasoby1).isEqualTo(zasoby2);
        zasoby2.setId(2L);
        assertThat(zasoby1).isNotEqualTo(zasoby2);
        zasoby1.setId(null);
        assertThat(zasoby1).isNotEqualTo(zasoby2);
    }
}
