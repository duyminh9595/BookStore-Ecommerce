package comecommerce.bookstore.dto;

import comecommerce.bookstore.entity.Book;
import comecommerce.bookstore.entity.OrderDetail;
import lombok.*;

@Data
public class CartDetail {
    private Long idBook;
    private String image_url;
    private String name;
    private Long price;
    private int quantity_sell;

}
