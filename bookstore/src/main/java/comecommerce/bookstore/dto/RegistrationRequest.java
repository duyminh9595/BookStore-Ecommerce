package comecommerce.bookstore.dto;

import lombok.Data;

@Data
public class RegistrationRequest {
    private final String name;
    private final boolean gender;
    private final String password;
    private final String email;
    private final int telephone;
}
