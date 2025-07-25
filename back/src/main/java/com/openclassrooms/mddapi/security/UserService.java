package com.openclassrooms.mddapi.security;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.exception.EmailAlreadyExistsException;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.UserRepo;
import java.util.List;
import java.util.Optional;

@Service("securityUserService")
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public UserModel createUser(UserModel user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("This email is already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public List<UserModel> getAllUsers() {
        return userRepo.findAll();
    }

    public UserModel getUserById(long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public boolean authenticate(String email, String rawPassword) {
        Optional<UserModel> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            return false;
        }
        UserModel user = userOptional.get();
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public Optional<UserModel> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}