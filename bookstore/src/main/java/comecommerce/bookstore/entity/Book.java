package comecommerce.bookstore.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;
    @Column(name="image_url")
    private String image_url;

    @Column(name="quantity")
    private int quantity;

    @Column(name="price")
    private Long price;

    @Column(name="date_created")
    private Date dateCreated;

    @Column(name="last_updated")
    private Date lastUpdated;


    @Column(name="active")
    private boolean active;

    @ManyToOne
    @JoinColumn(nullable = false,name = "publisher_id")
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(nullable = false,name = "category_id")
    private Category category;

//    @OneToMany(cascade = CascadeType.ALL,mappedBy = "book")
//    private Set<OrderItem> orderItems=new HashSet<>();
//
//    public void addOrderItemBook(OrderItem orderItem)
//    {
//        if(orderItem!=null)
//        {
//            if(orderItems==null)
//            {
//                orderItems=new HashSet<>();
//
//            }
//            orderItems.add(orderItem);
//            orderItem.setBook(this);
//        }
//    }
}
