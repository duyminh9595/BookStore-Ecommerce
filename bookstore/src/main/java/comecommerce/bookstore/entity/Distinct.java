package comecommerce.bookstore.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "district")
public class Distinct {
    @Id
    @Column(name = "id")
    private int id;
    @Column(name = "_name")
    private String _name;
    @Column(name = "_prefix")
    private String _prefix;
    @Column(name = "_province_id")
    private int _province_id;

}
