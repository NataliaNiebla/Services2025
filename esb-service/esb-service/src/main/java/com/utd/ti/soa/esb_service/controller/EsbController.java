package com.utd.ti.soa.esb_service.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.core.ParameterizedTypeReference;

import com.utd.ti.soa.esb_service.model.User;
import java.util.List;
import com.utd.ti.soa.esb_service.model.Auth;

@RestController
@RequestMapping("/app/esb")
public class EsbController {
    private final WebClient webClient = WebClient.create();
    private final Auth auth = new Auth(); 

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody User user, 
            @RequestHeader (HttpHeaders.AUTHORIZATION) String token) {
        System.out.println("Request Body: " + user);
        System.out.println("Token recibido: " + token);

        //Token recibido
        if (!auth.validateToken(token)) {
            return ResponseEntity.status(status:401)
                .body(body:"Token invalido o expirado");
        }
        
        String response = webClient.post()
            .uri("http://localhost:5000/api/v1/users/")
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .bodyValue(user)
            .retrieve()
            .bodyToMono(String.class)
            .doOnError(error -> System.out.println("Error: " + error.getMessage()))
            .block();
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = webClient.get()
            .uri("http://localhost:5000/api/v1/users/users")  // Corrected the URL here
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<List<User>>() {})
            .doOnError(error -> System.out.println("Error: " + error.getMessage()))
            .block();
    
        return ResponseEntity.ok(users);

    @PatchMapping("/update")
    public ResponseEntity 
    }
}
