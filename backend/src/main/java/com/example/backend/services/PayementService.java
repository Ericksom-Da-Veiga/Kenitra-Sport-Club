package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.payement.DTO_get_payements;
import com.example.backend.dto.payement.DTO_post_payements;
import com.example.backend.entites.Payement;
import com.example.backend.infra.Response;
import com.example.backend.repository.PayementRepository;

@Service
public class PayementService {
    @Autowired
    private PayementRepository repository;

    public Response<DTO_get_payements> recuperer_payements(){
        Response<DTO_get_payements> response = new Response<>();
        try {
            List<DTO_get_payements> list_payements = repository.findAll().stream().map(DTO_get_payements::new).toList();
            response.success("sucess","ok", list_payements);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

    public Response<DTO_get_payements> recuperer_payement_by_id(Long id){
        Response<DTO_get_payements> response = new Response<>();
        try {
            List<DTO_get_payements> list_payement = repository.findById(id).stream().map(DTO_get_payements::new).toList();
            response.success("sucess","ok", list_payement);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

    public Response<DTO_get_payements> save_payements(DTO_post_payements data){
        Response<DTO_get_payements> response = new Response<>();
        try {
            Payement payement = new Payement(data);
            repository.save(payement);

            List<DTO_get_payements> list_Payements = new ArrayList<>();
            list_Payements.add(new DTO_get_payements(payement));

            response.success("Payement ajoute", "OK", list_Payements);

        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }
    
    public Response<DTO_get_payements> delete(Long id){
        Response<DTO_get_payements> response = new Response<>();
        try {
            Payement payement = repository.getReferenceById(id);
            repository.delete(payement);

            response.success("Payement supprimer", "OK", null);
        } catch (Exception e) {
            response.exception(e.getMessage(), "KO");
        }
        return response;
    }

    public Response<Long> CountMoneyForCurrentMonth(){
        Response<Long> response = new Response<>();
        Long money =  repository.CountMoneyForCurrentMonth();
        List<Long> list_numbers = new ArrayList<>();
        list_numbers.add(money);
        response.success("sucess", "ok", list_numbers);
        return response;
    }

    public Response<Long> CountMoney(){
        Response<Long> response = new Response<>();
        Long money =  repository.CountTotalMoney();
        List<Long> list_numbers = new ArrayList<>();
        list_numbers.add(money);
        response.success("sucess", "ok", list_numbers);
        return response;
    }
    
}
