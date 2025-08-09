package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.UserModel;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String picture;

    public UserDTO(UserModel user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.picture = user.getPicture();
    }
}

