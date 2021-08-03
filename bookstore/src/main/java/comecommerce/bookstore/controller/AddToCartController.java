package comecommerce.bookstore.controller;

import comecommerce.bookstore.dao.OrderItemRepository;
import comecommerce.bookstore.dto.AddToCartDto;
import comecommerce.bookstore.dto.AloDto;
import comecommerce.bookstore.dto.CartDetail;
import comecommerce.bookstore.entity.Book;
import comecommerce.bookstore.entity.OrderDetail;
import comecommerce.bookstore.service.CheckOutService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/addtocart")
@CrossOrigin
@AllArgsConstructor
public class AddToCartController {

    private final CheckOutService checkOutService;
    private final OrderItemRepository orderItemRepository;
    @GetMapping("/test")
    public String test()
    {
        return "d";
    }
    @PostMapping("/checkout")
    public String checkOut(@RequestBody AddToCartDto data)
    {
        return checkOutService.placeOrder(data);
    }
    @GetMapping("/detailcart/{id}/{email}")
    public List<CartDetail> detail(@PathVariable Long id,@PathVariable String email)
    {
        List<CartDetail> cartDetails=new ArrayList<>();
        List<Book>books=orderItemRepository.findDataWithTemp(id,email);
        List<OrderDetail>orderDetails=orderItemRepository.findDataWithCartId(id);
        CartDetail cartDetail;
        for(Book book:books)
        {
            cartDetail=new CartDetail();
            cartDetail.setIdBook(book.getId());
            cartDetail.setName(book.getName());
            cartDetail.setImage_url(book.getImage_url());
            cartDetail.setPrice(book.getPrice());
            cartDetail.setIdBook(book.getId());
            for(OrderDetail orderDetail:orderDetails)
            {
                if(orderDetail.getBook_id()==book.getId()) {
                    cartDetail.setQuantity_sell(orderDetail.getQuantity());
                    break;
                }
            }
            cartDetails.add(cartDetail);
        }
        return cartDetails;
    }



}
