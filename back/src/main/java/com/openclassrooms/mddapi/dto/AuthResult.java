package com.openclassrooms.mddapi.dto;

public class AuthResult {
    private String token;
    private Long userId;

    public AuthResult(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }
}
