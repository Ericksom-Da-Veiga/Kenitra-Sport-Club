package com.example.backend.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.backend.entites.User;

@Service
public class TokenService {
    
    @Value("${api.security.token.secret}")
    private String secret;
    
    public String GenerateToken(User user){
        try {
             Algorithm algorithm = Algorithm.HMAC256(secret);
             String token = JWT.create()
                                .withIssuer("Gym-API")
                                .withSubject(user.getMail())
                                .withExpiresAt(genExepirationDate())
                                .sign(algorithm);
                return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error pendant la generation du token",e);
        }
    }

    // para determinar o tempo de vida(duraçao) desse nosso token
    private Instant genExepirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("+01:00")); //o nosso token vai ter um tempo de vida de 2 hrs
    }
}
