package comecommerce.bookstore.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class KeyOfOrderDetail implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false, name = "order_list_id")
    private Order order_list;


    //    @ManyToOne
//    @JoinColumn(name = "book_id",nullable = false)
//    private Book book;
    @Column(name = "book_id")
    private Long book_id;
}
