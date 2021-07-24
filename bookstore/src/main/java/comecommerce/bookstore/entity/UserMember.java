package comecommerce.bookstore.entity;

import comecommerce.bookstore.role.ROLE;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "user_detail")
public class UserMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @Column(name="gender",nullable = true)
    private boolean gender;

    @Column(name="identification_card_number",nullable = true)
    private String identification_card_number;

    @Column(name="date_of_birth",nullable = true)
    private Date date_of_birth;

    @Column(name="telephone",nullable = true)
    private int telephone;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="is_actived",nullable = true)
    private boolean is_actived;

    @Enumerated(EnumType.STRING)
    private ROLE accountRole;
    @Column(name = "token",nullable = false)
    private String token;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "expired_at",nullable = false)
    private LocalDateTime expiredAt;

    @Column(name = "confirmed_at",nullable = true)
    private LocalDateTime confirmedAt;

    @Column(name="token_login",nullable = true)
    private String token_login;
}
