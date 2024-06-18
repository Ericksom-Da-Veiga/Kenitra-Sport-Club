package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.entites.Coach;

public interface CoachRepository extends JpaRepository<Coach, Long> {
    @Query(value = "CALL findCoachByCinOrNom(?1)", nativeQuery = true)
    List<Coach> findCoachByCinOrNom(String data);

    // @Query(value = "SELECT id, cin, mail, password, c.nom, c.prenom, c.date_entree, c.adress, c.telephone FROM coach c WHERE c.cin LIKE :data OR c.nom LIKE :data OR c.prenom LIKE :data", nativeQuery = true)
    // List<Coach> findCoachByCinOrNom(@Param("data") String data);

} 

