package pro.patrykkrawczyk.edziennik.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Wiadomosci.
 */
@Entity
@Table(name = "wiadomosci")
public class Wiadomosci implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "odkiedy")
    private String odkiedy;

    @Column(name = "dokiedy")
    private String dokiedy;

    @Column(name = "tresc")
    private String tresc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOdkiedy() {
        return odkiedy;
    }

    public Wiadomosci odkiedy(String odkiedy) {
        this.odkiedy = odkiedy;
        return this;
    }

    public void setOdkiedy(String odkiedy) {
        this.odkiedy = odkiedy;
    }

    public String getDokiedy() {
        return dokiedy;
    }

    public Wiadomosci dokiedy(String dokiedy) {
        this.dokiedy = dokiedy;
        return this;
    }

    public void setDokiedy(String dokiedy) {
        this.dokiedy = dokiedy;
    }

    public String getTresc() {
        return tresc;
    }

    public Wiadomosci tresc(String tresc) {
        this.tresc = tresc;
        return this;
    }

    public void setTresc(String tresc) {
        this.tresc = tresc;
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
        Wiadomosci wiadomosci = (Wiadomosci) o;
        if (wiadomosci.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), wiadomosci.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Wiadomosci{" +
            "id=" + getId() +
            ", odkiedy='" + getOdkiedy() + "'" +
            ", dokiedy='" + getDokiedy() + "'" +
            ", tresc='" + getTresc() + "'" +
            "}";
    }
}
