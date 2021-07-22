package com.ecommerce.BookStore.entity;

import com.ecommerce.BookStore.role.ROLE;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "account_detail")
public class AccountDetail {
    @Id
    @Column(name="email_login")
    private String email_login;

    @Column(name="email_login")
    private String password;

    @Column(name="is_actived")
    private boolean is_actived;

    @Column(name="is_locked")
    private boolean is_locked;

    @Column(name="token")
    private String token;

    @Column(name="role")
    private ROLE role;

    @OneToOne
    @JoinColumn(name="user_detail_id",referencedColumnName = "id")
    private UserDetail userDetail;
}
