package com.example.backend.dto.sports;

import com.example.backend.entites.Sports;

/**
 * DTO_get_sports
 */
public record DTO_get_sports(
    Long id,
    String nom,
    Long nmbr_max_seance_semaine,
    Double prix
) {
    //constructor pour crier un nouveau objet apartir de l'entite Sports
    public DTO_get_sports(Sports sport){
        this(
            sport.getId(),
            sport.getNom(),
            sport.getNmbr_max_seance_semaine(),
            sport.getPrix()
        );
    }
}