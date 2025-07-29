package com.openclassrooms.mddapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.PostModel;

public interface PostRepo extends JpaRepository<PostModel, Long> {

}
