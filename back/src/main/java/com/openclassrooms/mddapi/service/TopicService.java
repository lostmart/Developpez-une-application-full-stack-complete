package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.TopicModel;
import com.openclassrooms.mddapi.repo.TopicRepo;

@Service
public class TopicService {

    private final TopicRepo topicRepo;

    public TopicService(TopicRepo topicRepo) {
        this.topicRepo = topicRepo;
    }

    public List<TopicModel> getAllTopics() {
        return topicRepo.findAll();
    }
}
