package comecommerce.bookstore.service;

import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.entity.UserMember;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailValidator {
    private final UserDetailRepository userDetailRepository;

    public boolean checkEmailValid(String email)
    {
        UserMember userMember=userDetailRepository.findByEmail(email);
        if(userMember!=null)
        {
            return false;
        }
        return true;


    }
}
