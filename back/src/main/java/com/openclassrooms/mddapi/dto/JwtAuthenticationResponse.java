package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}