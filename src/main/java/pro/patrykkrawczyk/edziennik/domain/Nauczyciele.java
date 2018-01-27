package pro.patrykkrawczyk.edziennik.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Nauczyciele.
 */
@Entity
@Table(name = "nauczyciele")
public class Nauczyciele implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "imie")
    private String imie;

    @Column(name = "nazwisko")
    private String nazwisko;

    @Column(name = "pesel")
    private String pesel;

    @Column(name = "telefon")
    private String telefon;

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

    public Nauczyciele imie(String imie) {
        this.imie = imie;
        return this;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public Nauczyciele nazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
        return this;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public String getPesel() {
        return pesel;
    }

    public Nauczyciele pesel(String pesel) {
        this.pesel = pesel;
        return this;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getTelefon() {
        return telefon;
    }

    public Nauczyciele telefon(String telefon) {
        this.telefon = telefon;
        return this;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
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
        Nauczyciele nauczyciele = (Nauczyciele) o;
        if (nauczyciele.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nauczyciele.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Nauczyciele{" +
            "id=" + getId() +
            ", imie='" + getImie() + "'" +
            ", nazwisko='" + getNazwisko() + "'" +
            ", pesel='" + getPesel() + "'" +
            ", telefon='" + getTelefon() + "'" +
            "}";
    }
}
