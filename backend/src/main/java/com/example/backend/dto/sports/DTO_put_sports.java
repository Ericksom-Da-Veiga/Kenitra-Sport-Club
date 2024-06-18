package com.example.backend.dto.sports;

import jakarta.validation.constraints.NotNull;

public record DTO_put_sports(
    @NotNull
    Long id,
    String nom,
    Long nmbr_max_seance_semaine,
    Double prix
) {

}
