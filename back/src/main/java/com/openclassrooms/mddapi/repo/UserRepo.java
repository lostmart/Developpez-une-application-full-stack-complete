package com.openclassrooms.mddapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.UserModel;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    boolean existsByEmail(String email);

    public UserModel findByEmail(String email);
}
