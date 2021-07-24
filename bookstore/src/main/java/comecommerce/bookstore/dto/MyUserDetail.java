package comecommerce.bookstore.dto;

import comecommerce.bookstore.entity.UserMember;
import comecommerce.bookstore.role.ROLE;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class MyUserDetail implements UserDetails {
    private String email;
    private boolean isEnabled;
    private String role;
    private String password;
    public  MyUserDetail(UserMember userMember)
    {
        this.email=userMember.getEmail();
        this.isEnabled=userMember.is_actived();
        this.role=userMember.getAccountRole().name();
        this.password=userMember.getPassword();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_"+role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
