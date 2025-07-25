package com.openclassrooms.mddapi.service;

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
import com.openclassrooms.mddapi.security.UserPrincipal;

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

    public UserModel registerUser(UserModel user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("This email is already taken");
        }
        
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String loginUser(String email, String password) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        
        // Set authentication in security context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Generate JWT token
        return tokenProvider.generateToken(authentication);
    }
}