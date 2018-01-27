package pro.patrykkrawczyk.edziennik.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Klasa.
 */
@Entity
@Table(name = "klasa")
public class Klasa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "srednia")
    private String srednia;

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

    public Klasa nazwa(String nazwa) {
        this.nazwa = nazwa;
        return this;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getSrednia() {
        return srednia;
    }

    public Klasa srednia(String srednia) {
        this.srednia = srednia;
        return this;
    }

    public void setSrednia(String srednia) {
        this.srednia = srednia;
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
        Klasa klasa = (Klasa) o;
        if (klasa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), klasa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Klasa{" +
            "id=" + getId() +
            ", nazwa='" + getNazwa() + "'" +
            ", srednia='" + getSrednia() + "'" +
            "}";
    }
}
