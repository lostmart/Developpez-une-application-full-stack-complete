package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import com.openclassrooms.mddapi.repo.UserRepo;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.openclassrooms.mddapi.model.SubscriptionModel;
import com.openclassrooms.mddapi.model.TopicModel;
import com.openclassrooms.mddapi.repo.SubscriptionRepo;
import com.openclassrooms.mddapi.repo.TopicRepo;

@Service
public class SubscriptionService {

    private final UserRepo userRepo;

    private final SubscriptionRepo subscriptionRepo;

    private final TopicRepo topicRepo;

    public SubscriptionService(SubscriptionRepo subscriptionRepo, TopicRepo topicRepo, UserRepo userRepo) {
        this.subscriptionRepo = subscriptionRepo;
        this.topicRepo = topicRepo;
        this.userRepo = userRepo;
    }

    public List<SubscriptionModel> getAllSubscriptions() {
        return subscriptionRepo.findAll();
    }

    public List<SubscriptionModel> getSubscriptionsByUserId(Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return subscriptionRepo.findByUserId(userId);
    }

    public SubscriptionModel saveSubscription(SubscriptionModel subscription) {
        return subscriptionRepo.save(subscription);
    }

    @Transactional
    public SubscriptionModel subscribeToTopic(Long userId, Long topicId, String description) {

        // get topic name
        Optional<TopicModel> topicOpt = topicRepo.findById(topicId);
        if (topicOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found");
        }
        String topicName = topicOpt.get().getName();

        // check user exists
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID cannot be null");
        }

        // Check if already subscribed
        SubscriptionModel existing = subscriptionRepo.findByUserIdAndTopicName(userId, topicName);
        if (existing != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already subscribed to this topic");
        }

        SubscriptionModel sub = new SubscriptionModel();
        sub.setUserId(userId);
        sub.setTopicName(topicName);
        sub.setDescription(description);

        return subscriptionRepo.save(sub);
    }

    @Transactional
    public boolean unsubscribe(Long userId, Long topicId) {
        String topicName = topicRepo.findById(topicId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found"))
                .getName();

        int deleted = subscriptionRepo.deleteByUserIdAndTopicName(userId, topicName);
        return deleted > 0;
    }

}
