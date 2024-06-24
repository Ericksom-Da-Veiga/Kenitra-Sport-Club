package com.example.backend.dto.user;

import com.example.backend.entites.User;

public record DTO_get_user(
    Long id,
    String cin,
    String mail,
    String nom, 
    String prenom,
    String telephone,
    String role
) {
    public DTO_get_user(User user) {
        this(
            user.getId(),
            user.getCin(),
            user.getMail(),
            user.getNom(),
            user.getPrenom(),
            user.getTelephone(),
            user.getRole()
        );
    }
}