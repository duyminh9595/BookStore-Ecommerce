package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "publisher",collectionResourceRel = "publisher")
public interface PublisherRepository extends JpaRepository<Publisher,Long> {
}
