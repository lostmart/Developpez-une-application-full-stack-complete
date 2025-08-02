package com.openclassrooms.mddapi.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.TopicModel;

public interface TopicRepo extends JpaRepository<TopicModel, Long> {

    Optional<TopicModel> findByName(String name);

}
