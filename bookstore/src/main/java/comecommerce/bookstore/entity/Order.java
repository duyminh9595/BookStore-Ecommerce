package comecommerce.bookstore.entity;



import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.management.Query;
import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "order_list")
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_detail_id")
    private UserMember user_detail;



    @Column(name = "total_price")
    private int total_price;


    @Column(name = "total_quantity")
    private int total_quantity;

    @Column(name="date_created")
    private String date_created;

    @Column(name = "address",nullable = true)
    private String address;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "order_list")
    private Set<OrderDetail> orderItems=new HashSet<>();

    public void AddOrderItem(OrderDetail orderDetail)
    {
        if(orderDetail!=null)
        {
            if(orderItems==null)
            {
                orderItems=new HashSet<>();
            }
            orderItems.add(orderDetail);
            orderDetail.setOrder_list(this);
        }
    }
    public String toString() {
        return "";
    }

}
