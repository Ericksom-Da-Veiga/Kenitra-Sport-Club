package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.entites.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    UserDetails findByMail(String mail);
}
