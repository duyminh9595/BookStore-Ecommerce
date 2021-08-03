package comecommerce.bookstore.controller;

import comecommerce.bookstore.dao.UserDetailRepository;
import comecommerce.bookstore.dto.CheckLoginDto;
import comecommerce.bookstore.dto.UserDetailDto;
import comecommerce.bookstore.entity.UserMember;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/userdetail/app")
public class UserDetailController {
    private UserDetailRepository userDetailRepository;
    private PasswordEncoder passwordEncoder;
    @PostMapping("/index")
    public CheckLoginDto getUser(@RequestBody CheckLoginDto loginDto)
    {
        UserMember userMember=userDetailRepository.findByEmail(loginDto.getEmail());
        if(userMember!=null)
        {
            loginDto.setName(userMember.getName());
            return loginDto;
        }
        throw new RuntimeException("Khong thay");
    }
    @PostMapping("/userdetail")
    public UserDetailDto getDetail(@RequestBody CheckLoginDto loginDto)
    {
        UserMember userMember=userDetailRepository.findByEmail(loginDto.getEmail());
        if(userMember!=null)
        {
            UserDetailDto userDetailDto=new UserDetailDto();
            userDetailDto.setEmail(userMember.getEmail());
            userDetailDto.setId(userMember.getId());
            userDetailDto.setPassword(userMember.getPassword());

            userDetailDto.setName(userMember.getName());
            userDetailDto.setGender(userMember.isGender());
            userDetailDto.setSdt(userMember.getTelephone());
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

                if(userMember.getDate_of_birth()!=null)
                {
                    userDetailDto.setNgaysinh(userMember.getDate_of_birth().toString().substring(0,10));
                }

                return userDetailDto;


        }
        throw new RuntimeException("Khong thay");
    }
    @PostMapping("/updatedetail")
    public UserDetailDto getDetail(@RequestBody UserDetailDto userDetailDto)
    {
        UserMember userMember=userDetailRepository.findByEmail((userDetailDto.getEmail()));
        if(userMember!=null)
        {
            userMember.setGender(userDetailDto.isGender());
            userMember.setName(userDetailDto.getName());
            userMember.setTelephone(userDetailDto.getSdt());
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd",Locale.ENGLISH);
            Date startDate;
            try {
                startDate = df.parse(userDetailDto.getNgaysinh().toString());
                userMember.setDate_of_birth(startDate);
                userMember.setPassword(passwordEncoder.encode(userDetailDto.getPassword()));
                userDetailRepository.save(userMember);
                return userDetailDto;
            } catch (ParseException e) {
                e.printStackTrace();
            }

        }
        throw  new RuntimeException("Khong thay");
    }

}
