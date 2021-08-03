package comecommerce.bookstore.dto;

import lombok.Data;

@Data
public class ListCategoryWithBookQuantity {
    private Long catId;
    private String catName;
    private int quantity;

    public ListCategoryWithBookQuantity(Long catId, int quantity,String catName) {
        this.catId=catId;
        this.quantity=quantity;
        this.catName=catName;
    }
}
