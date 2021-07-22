package com.ecommerce.BookStore.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user_detail")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @Column(name="gender")
    private boolean gender;

    @Column(name="identification_card_number")
    private String identification_card_number;

    @Column(name="date_of_birth")
    private Date date_of_birth;

    @Column(name="telephone")
    private int telephone;

    @OneToOne
    @PrimaryKeyJoinColumn
    private AccountDetail accountDetail;
}
