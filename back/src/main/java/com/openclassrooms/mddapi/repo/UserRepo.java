package com.openclassrooms.mddapi.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.UserModel;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    boolean existsByEmail(String email);

    @SuppressWarnings("null")
    boolean existsById(Long id);

    Optional<UserModel> findByEmail(String email);

}
