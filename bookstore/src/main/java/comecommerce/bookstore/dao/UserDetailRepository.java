package comecommerce.bookstore.dao;

import comecommerce.bookstore.entity.UserMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@RepositoryRestResource(path = "user-member",collectionResourceRel = "user-member")
@CrossOrigin
public interface UserDetailRepository extends JpaRepository<UserMember,Long> {
    UserMember findByEmail(@Param("email")String email);


    @Query("update UserMember  a set a.is_actived=true where a.email=?1")
    @Transactional
    @Modifying
    int enableAccount(String email);
    UserMember findByToken(@Param("token")String token);

//    UserMember findByEmailAndPassword(String email,String password);
}
