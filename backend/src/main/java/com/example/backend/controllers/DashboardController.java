package com.example.backend.controllers;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.abonnement.DTO_get_abonnement;
import com.example.backend.services.AdherantService;
import com.example.backend.services.DashboardService;
import com.example.backend.services.PayementService;
import com.example.backend.services.SportService;
import com.example.backend.infra.Response;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;
    @Autowired
    private SportService sportService;
    @Autowired
    private PayementService payementService;
    @Autowired
    private AdherantService adherantService;
    
    @GetMapping("/abonnements")
    public Response<Long> Count_Abonnemnt(){
        Response<Long> response = new Response<>();
        Long nombre =  service.countAbonnements();
        List<Long> list_numbers = new ArrayList<>();
        list_numbers.add(nombre);
        response.success("sucess", "ok", list_numbers);
        return response;
    }

    @GetMapping()
    public Response<DTO_get_abonnement> get_abonnements_presque_fini(){
       return service.get_abonnements_presque_fini();
    }

    @GetMapping("/sports")
    public Response<Long> count_sports(){
        return sportService.count_Sports();
    }

    @GetMapping("/adherants")
    public Response<Long> countAdherants(){
        return adherantService.count_Adherants();
    }

}
