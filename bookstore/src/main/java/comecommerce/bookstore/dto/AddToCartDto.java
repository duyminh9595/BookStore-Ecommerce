package comecommerce.bookstore.dto;

import comecommerce.bookstore.entity.Order;
import comecommerce.bookstore.entity.OrderDetail;
import lombok.Data;

import java.util.Set;

@Data
public class AddToCartDto {
    private String email;
    private Order order;
    private Set<OrderDetail>orderDetails;
}
