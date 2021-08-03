package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(path = "publisher",collectionResourceRel = "publisher")
@CrossOrigin
public interface PublisherRepository extends JpaRepository<Publisher,Long> {

}
