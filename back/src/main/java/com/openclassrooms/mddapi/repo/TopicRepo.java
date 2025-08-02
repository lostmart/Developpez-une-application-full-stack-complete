package com.openclassrooms.mddapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.TopicModel;

public interface TopicRepo extends JpaRepository<TopicModel, Long> {

}
