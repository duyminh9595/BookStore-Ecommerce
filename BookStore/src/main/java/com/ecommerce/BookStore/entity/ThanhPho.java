package com.ecommerce.BookStore.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "thanh_pho")
public class ThanhPho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @ManyToOne
    @JoinColumn(nullable = false,name = "tinh_id")
    private Tinh tinh;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "thanh_pho")
    private Set<Huyen>huyens;
}
