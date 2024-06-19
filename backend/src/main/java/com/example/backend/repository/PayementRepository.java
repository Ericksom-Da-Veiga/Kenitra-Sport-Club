package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.entites.Payement;

public interface PayementRepository extends JpaRepository<Payement, Long> {

    @Query(value = "call ShowMoneyForCurrentMonth()", nativeQuery = true)
    Long CountMoney();    
}
