package comecommerce.bookstore.service;

import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.dto.RegistrationRequest;
import comecommerce.bookstore.entity.UserMember;
import comecommerce.bookstore.role.ROLE;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final UserDetailRepository userDetailRepository;
    private final EmailValidator emailValidator;
    private final EmailSenderService emailSenderService;
    private final PasswordEncoder  passwordEncoder;

    public String signUpUser(RegistrationRequest request)
    {
        boolean isValid=emailValidator.checkEmailValid(request.getEmail());
        if(!isValid)
        {
            throw new IllegalStateException("email cannot be signed");
        }
        UserMember userMember=new UserMember();
        userMember.setId(0l);
        userMember.setName(request.getName());
        userMember.setEmail(request.getEmail());
        userMember.setTelephone(request.getTelephone());
        String encodedPassword=passwordEncoder.encode(request.getPassword());
        System.out.println(encodedPassword+ " password chua encode "+userMember.getPassword());
        userMember.setPassword(encodedPassword);
        userMember.setAccountRole(ROLE.USER);
        userMember.setGender(request.isGender());
        String token= UUID.randomUUID().toString();
        userMember.setToken(token);
        userMember.setCreatedAt(LocalDateTime.now());
        userMember.setExpiredAt(LocalDateTime.now().plusMinutes(30));
        userMember.set_actived(false);
        userDetailRepository.save(userMember);
//        String link="http://localhost:8080/api/register/confirm?token="+token;
        String link="http://localhost:4200/api/register/confirm/token/"+token;
        emailSenderService.sendSimpleMessage(request.getEmail(),"xac nhan dang ky tai ngok ngek boy",link);
        return token;
    }
    public String confirmToken(String token)
    {
        UserMember userMember=userDetailRepository.findByToken(token);
        if(userMember!=null)
        {
            LocalDateTime expiredAt=userMember.getExpiredAt();
            if(expiredAt.isBefore(LocalDateTime.now()))
            {
                throw new IllegalStateException("token expired");
            }
            enableAccount(userMember.getEmail());
            return "thanh cong";
        }
        else
        {
            throw new IllegalStateException("token not found");
        }
    }
    public int enableAccount(String email)
    {
        return userDetailRepository.enableAccount(email);
    }
}
