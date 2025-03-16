package com.utd.ti.soa.esb_service.utils;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class Auth {
    private final String SECRET_KEY = "aJksd9QzPl+sVdK7vYc/L4dK8HgQmPpQ5K9yApUsj3w=";

    public void validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StadardCharsets.UTF_8));
        
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
            System.out.println("Token invalido, usuario: " + claims.getSubject());
            return true;
        } catch (Exception e) {
            System.out.println("Error al validar el Token: " + e.getMessage());
            return false;
        }
    }
}
