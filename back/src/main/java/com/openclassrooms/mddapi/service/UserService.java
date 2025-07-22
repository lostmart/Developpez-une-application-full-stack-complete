package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String registerUser() {
        return "User registered successfully.";
    }

    public String loginUser() {
        return "User logged in successfully.";
    }

}
