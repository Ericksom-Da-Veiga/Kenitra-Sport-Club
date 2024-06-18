package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repository.SportsRepository;
import com.example.backend.dto.sports.DTO_get_sports;
import com.example.backend.dto.sports.DTO_post_sports;
import com.example.backend.dto.sports.DTO_put_sports;
import com.example.backend.entites.Sports;
import com.example.backend.infra.Response;

@Service
public class SportService {
    
    @Autowired
    private SportsRepository repository;

// recuperer tous les sports
    public Response<DTO_get_sports> get_sports(){
        Response<DTO_get_sports> response = new Response<>();

        try {
            List<DTO_get_sports> sports = repository.findAll()
                                            .stream()
                                            .map(DTO_get_sports::new)
                                            .toList();
            response.success("succes", "OK", sports);
            
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }

        return response;
    }

// recuperer un sports en utilisant l'id
    public Response<DTO_get_sports> get_by_id(Long id){
        Response<DTO_get_sports> response = new Response<>();
        try {
            Sports sport = repository.getReferenceById(id);
            List<DTO_get_sports> sports = new ArrayList<>();
            sports.add(new DTO_get_sports(sport));

            response.success("Sucess", "OK", sports);

        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

//recuperer un sport en utilisant le nom
    public Response<DTO_get_sports> get_by_nom(String nom){
        Response<DTO_get_sports> response = new Response<>();
        try {
            List<DTO_get_sports> sports = repository.findByNom(nom).stream().map(DTO_get_sports::new).toList();
            response.success("sucess", "OK", sports);
        } catch (Exception e) {
            response.exception(e.getMessage(), "Ko");
        }
        return response;
    }

//Enregistrer un nouveau sport
    public Response<DTO_get_sports> save_sport(DTO_post_sports data){
        Response<DTO_get_sports> response = new Response<>();
        try {
            Sports sport = new Sports(data);
            repository.save(sport);

            List<DTO_get_sports> sports = new ArrayList<>();
            sports.add(new DTO_get_sports(sport));

            response.success("Sport Entregistre", "OK", sports);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

// Modifier les info du Sport
    public Response<DTO_get_sports> update_sport(DTO_put_sports data){
        Response<DTO_get_sports> response = new Response<>();
        try {
            Sports sport = repository.getReferenceById(data.id());
            sport.updateInfo(data);

            List<DTO_get_sports> sports = new ArrayList<>();
            sports.add(new DTO_get_sports(sport));

            response.success("Sport Mofifer", "OK", sports);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }

        return response;
    }

// Supprimer un sport
    public Response<DTO_get_sports> delete_sport(Long id){
        Response<DTO_get_sports> response = new Response<>();
        try {
            Sports sport = repository.getReferenceById(id);
            repository.delete(sport);

            response.success("Sport supprimè", "OK", null);
            
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }
}
 