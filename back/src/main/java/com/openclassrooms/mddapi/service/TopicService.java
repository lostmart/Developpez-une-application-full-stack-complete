package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.openclassrooms.mddapi.model.TopicModel;
import com.openclassrooms.mddapi.repo.TopicRepo;
import com.openclassrooms.mddapi.security.AuthUtils;

@Service
public class TopicService {

    private final TopicRepo topicRepo;

    public TopicService(TopicRepo topicRepo) {
        this.topicRepo = topicRepo;
    }

    public List<TopicModel> getAllTopics() {
        return topicRepo.findAll();
    }

    public TopicModel getTopicById(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Topic ID cannot be null");
        }

        return topicRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found"));
    }

    public TopicModel createTopic(TopicModel topic) {
        if (topic == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Topic cannot be null");
        }

        if (topic.getName() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Topic name cannot be null");
        }

        // ✅ Get the authenticated user ID from the token
        Long authenticatedUserId = AuthUtils.getCurrentUserId();

        // ✅ Never trust the body-provided creator_id
        topic.setCreator_id(authenticatedUserId);

        // ❌ Remove this check — no longer needed:
        // if (topic.getCreator_id() == null) ...

        if (topicRepo.findByName(topic.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Topic already exists");
        }

        return topicRepo.save(topic);
    }
}
