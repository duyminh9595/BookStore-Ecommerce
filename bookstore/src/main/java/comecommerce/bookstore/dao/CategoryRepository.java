package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(path = "category",collectionResourceRel = "category")
@CrossOrigin
public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query("select p from Category p,Publisher  c where p.books.size>0 and c.id=:id ")
    Page<Category>findByBookAvailabe(@Param("id")Long id, Pageable pageable);

    @Query("select p.books from Category p,Publisher  c where p.books.size>0 and c.id=:id ")
    Page<Category>findByBookAvailabeQuantity(@Param("id")Long id, Pageable pageable);


    @Query("select p.books from Category p where p.id=:id")
    Page<Category>findBookWithCat(@Param("id")Long id,Pageable pageable);


}
