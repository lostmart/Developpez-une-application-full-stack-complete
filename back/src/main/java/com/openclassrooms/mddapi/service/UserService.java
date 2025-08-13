package com.openclassrooms.mddapi.service;

import javax.transaction.Transactional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.exception.EmailAlreadyExistsException;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.UserRepo;
import com.openclassrooms.mddapi.security.JwtTokenProvider;
import com.openclassrooms.mddapi.dto.AuthResult;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public UserService(
            UserRepo userRepo,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public UserDTO registerUser(UserModel user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("This email is already taken");
        }

        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return new UserDTO(user);
    }

    public AuthResult loginUser(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);

        UserModel user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("DEBUG - user ID: " + user.getId());
        System.out.println("DEBUG - user email: " + user.getEmail());

        return new AuthResult(token, user.getId());
    }

    public UserDTO getUserById(Long userId) {
        UserModel user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);
    }

    // update user

    @Transactional
    public UserDTO updateUser(Long userId, UserUpdateRequest req) {
        UserModel user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // username
        if (req.getUsername() != null && !req.getUsername().isBlank()) {
            user.setUsername(req.getUsername().trim());
        }

        // email (ensure it's unique if changing)
        if (req.getEmail() != null && !req.getEmail().isBlank()) {
            String newEmail = req.getEmail().trim();
            boolean emailTaken = userRepo.existsByEmail(newEmail) && !newEmail.equalsIgnoreCase(user.getEmail());
            if (emailTaken) {
                throw new EmailAlreadyExistsException("This email is already taken");
            }
            user.setEmail(newEmail);
        }

        // picture
        if (req.getPicture() != null && !req.getPicture().isBlank()) {
            user.setPicture(req.getPicture().trim());
        }

        // password: require currentPassword to change it
        if (req.getNewPassword() != null && !req.getNewPassword().isBlank()) {
            if (req.getCurrentPassword() == null ||
                    !passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        }

        UserModel saved = userRepo.save(user);
        return new UserDTO(saved);
    }

}