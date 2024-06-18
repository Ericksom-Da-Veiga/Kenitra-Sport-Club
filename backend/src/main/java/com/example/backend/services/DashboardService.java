package com.example.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.dashboard.DTO_get_list_Dashboard;
import com.example.backend.infra.Response;
import com.example.backend.repository.AbonnementRepository;

@Service
public class DashboardService {
    @Autowired
    private AbonnementRepository AbonnementRepository;

    //recuperer la liste des Abonnements que vont terminer cet moi
    // public Response<DTO_get_list_Dashboard> get_abonnements_presque_fini(){
    //     Response<DTO_get_list_Dashboard> response = new Response<>();
    //     try {
    //         List<DTO_get_list_Dashboard> abonnements = AbonnementRepository.ShowStatsForCurrentmonth();
    //         response.success("sucess", "OK", abonnements);
    //     } catch (Exception e) {
    //         response.exception(e.getMessage(), "KO");
    //     }
    //     return response;
    // }
    
}
