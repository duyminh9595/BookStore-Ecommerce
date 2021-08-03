package comecommerce.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
public class CheckLoginDto {
    private String email;
    private String name;
    public CheckLoginDto(String email,String name)
    {
        this.email=email;
        this.name=name;
    }
    public CheckLoginDto()
    {

    }
}
