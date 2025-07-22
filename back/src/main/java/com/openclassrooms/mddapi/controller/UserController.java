package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.service.UserService;

/**
 * Controller that handles authentication and user account operations.
 */
@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser() {
        return userService.registerUser();
    }

    @PostMapping("/login")
    public String loginUser() {
        return userService.loginUser();
    }

}
