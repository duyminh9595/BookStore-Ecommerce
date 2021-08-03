package comecommerce.bookstore.dto;

import lombok.*;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class RegistrationRequest {
    private  String name;
    private boolean gender;
    private String password;
    private  String email;
    private  int telephone;
}
