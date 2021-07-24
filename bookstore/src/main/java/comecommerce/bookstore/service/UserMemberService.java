package comecommerce.bookstore.service;

import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.dto.MyUserDetail;
import comecommerce.bookstore.entity.UserMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserMemberService implements UserDetailsService {
    @Autowired
    private UserDetailRepository userDetailRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserMember userMember=userDetailRepository.findByEmail(username);
        return new MyUserDetail(userMember);
    }
}
