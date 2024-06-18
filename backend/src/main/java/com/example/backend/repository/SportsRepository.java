package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.entites.Sports;

public interface SportsRepository extends JpaRepository<Sports, Long> {

    @Query(value = "CALL findSportByNom(?1)", nativeQuery = true)
    List<Sports> findByNom(@Param("nom") String nom);
    
}