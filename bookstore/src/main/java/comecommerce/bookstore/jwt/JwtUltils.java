package comecommerce.bookstore.jwt;

import comecommerce.bookstore.dto.MyUserDetail;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import java.time.LocalDate;
import java.util.Date;

@Component
public class JwtUltils {
    public String generateJwtToken(Authentication authentication) {

        MyUserDetail userPrincipal = (MyUserDetail) authentication.getPrincipal();
        String key="securesecuresecuresecuresecuresecuresecuresecuresecuresecuresecure";
        return Jwts .builder()
                .setSubject(userPrincipal.getUsername())
                .claim("authorities",userPrincipal.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(10)))
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }
    public String getUserNameFromJwtToken(String token) {

        String key="securesecuresecuresecuresecuresecuresecuresecuresecuresecuresecure";
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
    }
}
