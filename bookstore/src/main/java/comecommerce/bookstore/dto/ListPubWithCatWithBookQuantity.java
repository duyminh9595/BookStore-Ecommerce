package comecommerce.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ListPubWithCatWithBookQuantity {
    private Long pubId;
    private String pubName;
    private List<ListCategoryWithBookQuantity>ls;

}
