package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.EmailAlreadyExistsException;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.UserRepo;

@Service
public class UserService {

    private final UserRepo userRepo;

    // Constructor injection
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;

    }

    public UserModel registerUser(UserModel user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("This email is already taken");
        }
        return userRepo.save(user);
    }

    public String loginUser() {
        return "User logged in successfully.";
    }

}
