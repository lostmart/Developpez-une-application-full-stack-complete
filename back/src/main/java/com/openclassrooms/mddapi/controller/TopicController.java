package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.TopicModel;
import com.openclassrooms.mddapi.service.TopicService;

@PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/api/topics")

public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public List<TopicModel> getAllToopics() {
        return topicService.getAllTopics();
    }

}
