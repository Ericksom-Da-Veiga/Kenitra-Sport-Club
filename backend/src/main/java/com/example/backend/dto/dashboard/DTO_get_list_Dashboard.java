package com.example.backend.dto.dashboard;

public record DTO_get_list_Dashboard(
    Long ActiveAbonnements,
    Long ActiveAdherants,
    Long TotalMoneyCollected
) {
}
