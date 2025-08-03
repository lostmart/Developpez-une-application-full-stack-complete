package com.openclassrooms.mddapi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.PostModel;

public interface PostRepo extends JpaRepository<PostModel, Long> {

    List<PostModel> findByTopic(String topicName);
}
