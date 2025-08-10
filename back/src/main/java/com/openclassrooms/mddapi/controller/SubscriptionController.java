package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.SubscribeRequest;
import com.openclassrooms.mddapi.model.SubscriptionModel;
import com.openclassrooms.mddapi.security.AuthUtils;
import com.openclassrooms.mddapi.service.SubscriptionService;

/*
 * Controller that handles post operations
 */

@PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/api/subscriptions")

public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;

    }

    @GetMapping
    public List<SubscriptionModel> getSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    // ✅ Get subscriptions by user ID
    @GetMapping("/user/{userId}")
    public List<SubscriptionModel> getSubscriptionsByUserId(@PathVariable Long userId) {
        return subscriptionService.getSubscriptionsByUserId(userId);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/subscribe/{topicId}")
    public ResponseEntity<?> subscribeToTopic(
            @PathVariable Long topicId,
            @RequestBody(required = false) SubscribeRequest request) {

        Long userId = AuthUtils.getCurrentUserId();
        String description = (request != null && request.getDescription() != null)
                ? request.getDescription()
                : "";

        return ResponseEntity.ok(
                subscriptionService.subscribeToTopic(userId, topicId, description));
    }

}
