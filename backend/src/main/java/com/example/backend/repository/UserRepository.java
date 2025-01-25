package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.entites.User;

import jakarta.validation.constraints.NotBlank;

public interface UserRepository extends JpaRepository<User, Long> {
    
    UserDetails findByMail(String mail);

    @Query("select u from User u where u.cin = :cin")
    User findByCin(@NotBlank String cin);

    @Query(value = "CALL findUserByCinOrNom(?1)", nativeQuery = true)
    List<User> finduserByCinOrNom(String data);
}