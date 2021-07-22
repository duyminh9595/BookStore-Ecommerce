package com.ecommerce.BookStore.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "huyen")
public class Huyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "thanh_pho_id",nullable = false)
    private ThanhPho thanh_pho;
}
