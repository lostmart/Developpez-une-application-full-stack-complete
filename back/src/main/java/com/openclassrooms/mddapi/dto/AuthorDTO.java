package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class AuthorDTO {
    private Long id;

    public AuthorDTO(Long id) {
        this.id = id;
    }
}