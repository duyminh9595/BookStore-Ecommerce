package comecommerce.bookstore.controller;

import com.google.common.base.Strings;
import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.dto.LoginResponse;
import comecommerce.bookstore.dto.MyUserDetailService;
import comecommerce.bookstore.dto.RegistrationRequest;
import comecommerce.bookstore.dto.UsernameAndPasswordAuthenticationRequest;
import comecommerce.bookstore.jwt.JwtUltils;
import comecommerce.bookstore.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController

@AllArgsConstructor
@RequestMapping("/api/register")
@CrossOrigin
public class RegisterController {
    private final RegistrationService registrationService;
    private UserDetailRepository userDetailRepository;
    private final JwtUltils jwtUltils;
    private final AuthenticationManager authenticationManager;
    private final MyUserDetailService myUserDetailService;

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
    @PostMapping("/login")
    public LoginResponse authenticateUser(@RequestBody UsernameAndPasswordAuthenticationRequest login) throws UsernameNotFoundException
    {
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(),login.getPassword()));
        String jwt=jwtUltils.generateJwtToken(authentication);
        if(!Strings.isNullOrEmpty(jwt))
        {

            return new LoginResponse(login.getUsername(),jwt);
        }
        throw new UsernameNotFoundException("Not found username");
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
