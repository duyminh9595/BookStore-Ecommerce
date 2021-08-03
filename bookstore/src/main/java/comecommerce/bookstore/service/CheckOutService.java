package comecommerce.bookstore.service;

import comecommerce.bookstore.dao.BookRepository;
import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.dto.AddToCartDto;
import comecommerce.bookstore.entity.Book;
import comecommerce.bookstore.entity.Order;
import comecommerce.bookstore.entity.OrderDetail;
import comecommerce.bookstore.entity.UserMember;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class CheckOutService {
    private final UserDetailRepository userDetailRepository;
    private final BookRepository bookRepository;
    @Transactional
    public String placeOrder(AddToCartDto data) throws RuntimeException
    {
        Order order=data.getOrder();

        Set<OrderDetail>orderItems=data.getOrderDetails();
        for(OrderDetail orderDetail:orderItems)
        {
            Optional<Book> book=bookRepository.findBookById(orderDetail.getBook_id());
            if(book.get().getQuantity()<orderDetail.getQuantity())
                throw new RuntimeException("khong thuc thi");
            else
            {
                book.get().setQuantity(book.get().getQuantity()-orderDetail.getQuantity());
                bookRepository.save(book.get());
            }

        }
        orderItems.forEach(orderItem -> order.AddOrderItem(orderItem));
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=new Date();
        order.setDate_created(simpleDateFormat.format(date));
        UserMember  userMember=userDetailRepository.findByEmail(data.getEmail());
        if(userMember!=null)
        {
            userMember.AddOrderList(order);
        }
        userDetailRepository.save(userMember);
        return "d";
    }
}
