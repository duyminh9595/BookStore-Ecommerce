package com.ecommerce.BookStore.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @Column(name="image_url")
    private String image_url;

    @Column(name="quantity")
    private int quantity;

    @Column(name="price")
    private Long price;

    @ManyToOne
    @JoinColumn(nullable = false,name = "publisher_id")
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(nullable = false,name = "category_id")
    private Category category;
}
