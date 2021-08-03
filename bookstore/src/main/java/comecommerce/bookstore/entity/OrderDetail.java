package comecommerce.bookstore.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "order_detail")
@IdClass(KeyOfOrderDetail.class)
public class OrderDetail {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Long id;


    @Id
    @ManyToOne
    @JoinColumn(nullable = false, name = "order_list_id")
    private Order order_list;


    //    @ManyToOne
//    @JoinColumn(name = "book_id",nullable = false)
//    private Book book;
    @Id
    @Column(name = "book_id")
    private Long book_id;

    @Column(name = "quantity")
    private int quantity;
}