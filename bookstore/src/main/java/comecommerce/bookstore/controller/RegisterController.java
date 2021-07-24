package comecommerce.bookstore.controller;

import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.dto.RegistrationRequest;
import comecommerce.bookstore.dto.UsernameAndPasswordAuthenticationRequest;
import comecommerce.bookstore.entity.UserMember;
import comecommerce.bookstore.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController

@AllArgsConstructor
@RequestMapping("/api/register")
public class RegisterController {
    private final RegistrationService registrationService;
    private UserDetailRepository userDetailRepository;
    private final PasswordEncoder passwordEncoder;
    @PostMapping("/signin")
    public String register(@RequestBody RegistrationRequest request)
    {
        return registrationService.signUpUser(request);
    }
    @GetMapping("/confirm")
    public String confirm(@RequestParam("token")String token)
    {
        return registrationService.confirmToken(token);
    }

//    @PostMapping("/login")
//    public String login(@RequestBody UsernameAndPasswordAuthenticationRequest myUserDetail) {
//        UserMember userMember = new UserMember();
//        userMember = userDetailRepository.findByEmail(myUserDetail.getUsername());
//        System.out.println(myUserDetail.getPassword());
//        System.out.println(passwordEncoder.encode(myUserDetail.getPassword()));
//        System.out.println(userMember.getPassword());
//        if (userMember != null) {
//            if (passwordEncoder.matches(myUserDetail.getPassword(),userMember.getPassword()))
//            {
//                return " thanh cong";
//            }
//        }
//        return "that bai";
//    }
}
