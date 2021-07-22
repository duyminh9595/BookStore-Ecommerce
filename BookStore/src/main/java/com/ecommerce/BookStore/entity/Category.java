package com.ecommerce.BookStore.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "category")
    private Set<Book> books;
}
