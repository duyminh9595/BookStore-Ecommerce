package comecommerce.bookstore.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "tinh")
public class Tinh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "tinh")
    private Set<ThanhPho> thanhPho;
}
