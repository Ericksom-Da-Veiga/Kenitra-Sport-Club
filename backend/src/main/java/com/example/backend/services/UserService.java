package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.user.DTO_get_user;
import com.example.backend.dto.user.DTO_post_user;
import com.example.backend.dto.user.DTO_put_user;
import com.example.backend.entites.User;
import com.example.backend.infra.Response;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired 
    UserRepository repository;

    public Response<DTO_get_user> recuperer_user(){
        Response<DTO_get_user> response = new Response<>();
        try {
            List<DTO_get_user> users = repository.findAll().stream().map(DTO_get_user::new).toList();
            response.success("success", "OK", users);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }
//pour recuperer un user en utilisant l'id
    public Response<DTO_get_user> recuperer_user_id(Long id){
        Response<DTO_get_user> response = new Response<>();
        try {
            User user = repository.getReferenceById(id);
            List<DTO_get_user> users = new ArrayList<>();
            users.add(new DTO_get_user(user));

            response.success("sucess", "OK", users);

        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

//pour recuperer un user en utilisant l'CIN ou le nom
    public Response<DTO_get_user> detail_user(String data){
        Response<DTO_get_user> response = new Response<>();
        try {
            List<DTO_get_user> users = repository.finduserByCinOrNom(data)
                .stream()
                .map(DTO_get_user::new)
                .toList();

            response.success("Sucess", "OK", users);

        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

// Enregister un nouveau user
    public Response<DTO_get_user> create_user(DTO_post_user data){
        Response<DTO_get_user> response = new Response<>();
        User user1 = repository.findByCin(data.cin());
        //tester si le user existe deja
        if(user1 != null){
            String message = "Le CIN "+data.cin()+" est déjà enregistre";
            response.error(message, "KO");
            return response;
        }else if((repository.findByMail(data.mail()))!= null){
            String message = "Le mail "+data.mail()+" et déjà enregistre, veuillez essayer un nouveau adresse mail";
            response.error(message, "KO");
            return response;
        }
        try {
            String ecryptedPassword = new BCryptPasswordEncoder().encode(data.password()); 

            User user = new User(data, ecryptedPassword);
            repository.save(user);
            // crie une list Coahs et l'inicializer pour ajouter les informations de l'adherant que vien d'etre crie
            List<DTO_get_user> users = new ArrayList<>();
            users.add(new DTO_get_user(user));
            
            response.success("user ajoutée", "OK", users);

        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

// Modifier les information des Utilisateur
    public Response<DTO_get_user> modifier_user(DTO_put_user data){
        Response<DTO_get_user> response = new Response<>();
        try {
            User user = repository.getReferenceById(data.id());
            user.UpdatInfo(data);

            List<DTO_get_user> users = new ArrayList<>();
            users.add(new DTO_get_user(user));
            
            response.success("user modifiè", "OK", users);

        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

// Supprimer un Utilisateur
    public Response<DTO_get_user> delete_user(Long id){
        Response<DTO_get_user> response = new Response<>();
        try {
            User user = repository.getReferenceById(id);
            repository.delete(user);

            response.success("user supprimè", "OK", null);
            
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    } 
}