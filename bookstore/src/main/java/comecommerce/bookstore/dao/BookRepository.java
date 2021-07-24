package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "book",collectionResourceRel = "book")
public interface BookRepository extends JpaRepository<Book,Long> {

}
