package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class AuthorDTO {
    private Long id;
    private String userName;

    public AuthorDTO(Long id, String userName) {
        this.id = id;
        this.userName = userName;
    }
}