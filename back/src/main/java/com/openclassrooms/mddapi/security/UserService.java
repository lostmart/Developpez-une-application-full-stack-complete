package com.openclassrooms.mddapi.security;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.EmailAlreadyExistsException;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.UserRepo;

@Service("securityUserService")
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // // Constructor injection
    // public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
    // this.userRepo = userRepo;
    // this.passwordEncoder = passwordEncoder;
    // }

    public UserModel createUser(UserModel user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("This email is already taken");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepo.save(user);
    }

    public List<UserModel> getAllUsers() {
        return userRepo.findAll(); // This uses the built-in findAll() method
    }

    public UserModel getUserById(long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    // authenticate
    public boolean authenticate(String email, String rawPassword) {
        UserModel user = userRepo.findByEmail(email);
        return user != null && passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public UserModel findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

}
