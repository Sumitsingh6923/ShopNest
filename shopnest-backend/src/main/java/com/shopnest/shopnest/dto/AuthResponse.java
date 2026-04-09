package com.shopnest.shopnest.dto;

import com.shopnest.shopnest.entity.User;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user  = user;
    }
}
