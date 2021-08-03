package comecommerce.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDetailDto {
    private Long id;
    private String name;
    private String email;
    private String ngaysinh;
    private boolean gender;
    private String password;
    private int sdt;
}
