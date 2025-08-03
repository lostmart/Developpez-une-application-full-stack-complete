package com.openclassrooms.mddapi.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String getSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

}
