package com.example.backend.entites;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String CIN;
    private String mail;
    private String password;
    private String nom;
    private String prenom;
    private String telephone;
    private String role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role.equalsIgnoreCase("ADMIN")) 
			return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN") );
		else 
			return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
    }
    
    @Override
    public String getUsername() {
        return mail;
    }

    public String getPassword() {
        return password;
    }
}
