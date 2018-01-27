package pro.patrykkrawczyk.edziennik.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Sala.
 */
@Entity
@Table(name = "sala")
public class Sala implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numer")
    private String numer;

    @Column(name = "zasoby")
    private String zasoby;

    @Column(name = "przedmioty")
    private String przedmioty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumer() {
        return numer;
    }

    public Sala numer(String numer) {
        this.numer = numer;
        return this;
    }

    public void setNumer(String numer) {
        this.numer = numer;
    }

    public String getZasoby() {
        return zasoby;
    }

    public Sala zasoby(String zasoby) {
        this.zasoby = zasoby;
        return this;
    }

    public void setZasoby(String zasoby) {
        this.zasoby = zasoby;
    }

    public String getPrzedmioty() {
        return przedmioty;
    }

    public Sala przedmioty(String przedmioty) {
        this.przedmioty = przedmioty;
        return this;
    }

    public void setPrzedmioty(String przedmioty) {
        this.przedmioty = przedmioty;
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
        Sala sala = (Sala) o;
        if (sala.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sala.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sala{" +
            "id=" + getId() +
            ", numer='" + getNumer() + "'" +
            ", zasoby='" + getZasoby() + "'" +
            ", przedmioty='" + getPrzedmioty() + "'" +
            "}";
    }
}
