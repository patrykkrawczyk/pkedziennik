package pro.patrykkrawczyk.edziennik.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Uczen.
 */
@Entity
@Table(name = "uczen")
public class Uczen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "imie")
    private String imie;

    @Column(name = "nazwisko")
    private String nazwisko;

    @Column(name = "klasa")
    private String klasa;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImie() {
        return imie;
    }

    public Uczen imie(String imie) {
        this.imie = imie;
        return this;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public Uczen nazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
        return this;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public String getKlasa() {
        return klasa;
    }

    public Uczen klasa(String klasa) {
        this.klasa = klasa;
        return this;
    }

    public void setKlasa(String klasa) {
        this.klasa = klasa;
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
        Uczen uczen = (Uczen) o;
        if (uczen.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), uczen.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Uczen{" +
            "id=" + getId() +
            ", imie='" + getImie() + "'" +
            ", nazwisko='" + getNazwisko() + "'" +
            ", klasa='" + getKlasa() + "'" +
            "}";
    }
}
