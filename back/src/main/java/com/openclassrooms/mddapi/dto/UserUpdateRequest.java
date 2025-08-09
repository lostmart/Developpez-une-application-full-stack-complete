package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserUpdateRequest {

    @Size(min = 3, max = 50, message = "Username must be 3-50 characters")
    private String username;

    @Email(message = "Invalid email")
    private String email;

    private String picture;

    @Size(min = 8, message = "Password must be at least 8 characters")
    private String newPassword;

    private String currentPassword;
}
