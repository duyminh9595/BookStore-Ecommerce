package comecommerce.bookstore.dao;

import comecommerce.bookstore.dto.CartDetail;
import comecommerce.bookstore.entity.Book;
import comecommerce.bookstore.entity.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(path = "order-item",collectionResourceRel = "order-item")
public interface OrderItemRepository extends JpaRepository<OrderDetail, Long> {

    @Query("select b from OrderDetail p,Book b where p.book_id=b.id and p.order_list.id=?1 and p.order_list.user_detail.email=?2")
    List<Book> findDataWithTemp(@Param("id")Long id,@Param("email")String email);

    @Query("select p from OrderDetail p where  p.order_list.id=?1")
    List<OrderDetail> findDataWithCartId(@Param("id")Long id);
}
