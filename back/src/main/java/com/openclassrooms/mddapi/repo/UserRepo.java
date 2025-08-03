package com.openclassrooms.mddapi.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.UserModel;

import lombok.NonNull;

public interface UserRepo extends JpaRepository<UserModel, @NonNull Long> {
    boolean existsByEmail(String email);

    boolean existsById(Long id);

    Optional<UserModel> findByEmail(String email);

}
