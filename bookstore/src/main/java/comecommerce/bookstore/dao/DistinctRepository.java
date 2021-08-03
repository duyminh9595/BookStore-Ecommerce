package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.Distinct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(path = "distinct",collectionResourceRel = "distinct")
public interface DistinctRepository extends JpaRepository<Distinct,Integer> {
}
