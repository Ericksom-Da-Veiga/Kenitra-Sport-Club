package com.example.backend.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.dashboard.DTO_get_list_Dashboard;
import com.example.backend.services.DashboardService;
import com.example.backend.infra.Response;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;
    
    // @GetMapping
    // // private Response<DTO_get_list_Dashboard> get_abonnements_presque_fini(){
    // //     return service.get_abonnements_presque_fini();
    // // }
}
