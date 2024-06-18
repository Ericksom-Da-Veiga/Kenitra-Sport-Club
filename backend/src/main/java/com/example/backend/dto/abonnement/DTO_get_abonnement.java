package com.example.backend.dto.abonnement;

import java.time.LocalDate;

import com.example.backend.entites.Abonnement;


public record DTO_get_abonnement(
    Long id,
    Long id_adherant,
    LocalDate date_debut,
    LocalDate date_fin,
    Double prix_totale,
    int active
) {

    public DTO_get_abonnement(Abonnement abonnement) {
        this(
            abonnement.getId(),
            abonnement.getId_adherant(),
            abonnement.getDate_debut(),
            abonnement.getDate_fin(),
            abonnement.getPrix_totale(),
            abonnement.getActive()
        );
    };
    // public DTO_get_abonnement(Long id, Long id_adherant, LocalDate date_debut, LocalDate date_fin, Double prix_totale) {
    //     this.id = id;
    //     this.id_adherant = id_adherant;
    //     this.date_debut = date_debut;
    //     this.date_fin = date_fin;
    //     this.prix_totale = prix_totale;
    // };
}