package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(path = "order",collectionResourceRel = "orders")
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("select p from Order p where p.user_detail.email=?1")
    Page<Order>findOrderByUserEmail(@Param("email")String email, Pageable pageable);
}
