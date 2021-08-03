package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Book;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "book",collectionResourceRel = "book")
@CrossOrigin
public interface BookRepository extends JpaRepository<Book,Long> {
    Page<Book>findByNameContaining(@Param("name")String name, Pageable pageable);

    Page<Book>findByNameContainingOrderByPriceAsc(@Param("name")String name, Pageable pageable);
    Page<Book>findByNameContainingOrderByPriceDesc(@Param("name")String name, Pageable pageable);

    Page<Book>findBookByNameContainingOrderByDateCreatedDesc(@Param("name")String name, Pageable pageable);

    Optional<Book> findBookById(@Param("id")Long id);


    @Query("select p from Book  p   order by p.price asc ")
    Page<Book>findProductPriceAsc(Pageable pageable);
    @Query("select p from Book  p order by p.price desc ")
    Page<Book>findProductPriceDesc(Pageable pageable);
    @Query("select p from Book  p order by p.dateCreated desc ")
    Page<Book>findOrderByDateCreatedDesc(Pageable pageable);

    @Query("select p from Book p where p.id<>?3 and p.category.id=?2 and p.publisher.id=?1 and p.quantity<>0 ")
    Page<Book>findData(@Param("publisher")Long publisher,@Param(("category"))Long category,@Param(("id"))Long id,Pageable pageable);


    @Query("select p from Book p where p.category.id=?2 and p.publisher.id=?1 and p.quantity<>0 ")
    Page<Book>findDataBaseOnCatAndPub(@Param("publisher")Long publisher,@Param("category")Long category,Pageable pageable);

    List<Book>findBookByCategoryId(@Param("id")Long id);

    @Query("select p from Book  p where p.category.id=?1 and p.publisher.id=?2")
    List<Book>findDataCatPub(@Param("catId")Long catId, @Param("pubId")Long pubId);

    Page<Book>findByCategoryId(@Param("id")Long id,Pageable pageable);


}
