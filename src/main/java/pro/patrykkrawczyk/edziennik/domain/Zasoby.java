package pro.patrykkrawczyk.edziennik.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Zasoby.
 */
@Entity
@Table(name = "zasoby")
public class Zasoby implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "sala")
    private String sala;

    @Column(name = "ilosc")
    private String ilosc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public Zasoby nazwa(String nazwa) {
        this.nazwa = nazwa;
        return this;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getSala() {
        return sala;
    }

    public Zasoby sala(String sala) {
        this.sala = sala;
        return this;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getIlosc() {
        return ilosc;
    }

    public Zasoby ilosc(String ilosc) {
        this.ilosc = ilosc;
        return this;
    }

    public void setIlosc(String ilosc) {
        this.ilosc = ilosc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Zasoby zasoby = (Zasoby) o;
        if (zasoby.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zasoby.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Zasoby{" +
            "id=" + getId() +
            ", nazwa='" + getNazwa() + "'" +
            ", sala='" + getSala() + "'" +
            ", ilosc='" + getIlosc() + "'" +
            "}";
    }
}
