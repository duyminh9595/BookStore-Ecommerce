package comecommerce.bookstore.dto;

import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.entity.UserMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserDetailRepository userDetailRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserMember userMember =userDetailRepository.findByEmail(username);
        if(userMember==null)
        {
            throw new UsernameNotFoundException("Could not found user");
        }
        return new MyUserDetail(userMember);
    }
}
