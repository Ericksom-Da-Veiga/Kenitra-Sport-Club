package com.example.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.abonnement.DTO_get_abonnement;
import com.example.backend.infra.Response;
import com.example.backend.repository.AbonnementRepository;

@Service
public class DashboardService {
    @Autowired
    private AbonnementRepository AbonnementRepository;

    //recuperer la liste des Abonnements que vont terminer cet moi
    public Response<DTO_get_abonnement> get_abonnements_presque_fini(){
        Response<DTO_get_abonnement> response = new Response<>();
        try {
            List<DTO_get_abonnement> abonnements = AbonnementRepository.findAbonnementPresqueFini().stream().map(DTO_get_abonnement::new).toList();
            response.success("sucess", "OK", abonnements);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

    public Long countAbonnements(){
        return AbonnementRepository.countAbonnement();
    } 
}
