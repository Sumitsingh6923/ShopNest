package com.shopnest.shopnest.controller;

import com.shopnest.shopnest.dto.AuthResponse;
import com.shopnest.shopnest.dto.LoginRequest;
import com.shopnest.shopnest.dto.RegisterRequest;
import com.shopnest.shopnest.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        authService.register(request);

        return ResponseEntity.ok("User registered successfully");
    }

    // Login
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());

        return authService.login(request);
    }
}