package com.openclassrooms.mddapi.dto;

public class SubscribeRequest {
    private String description;

    public SubscribeRequest(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
