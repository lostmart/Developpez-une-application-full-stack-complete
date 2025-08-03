package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.SubscriptionModel;
import com.openclassrooms.mddapi.repo.SubscriptionRepo;

@Service
public class SubscriptionService {

    private final SubscriptionRepo subscriptionRepo;

    public SubscriptionService(SubscriptionRepo subscriptionRepo) {
        this.subscriptionRepo = subscriptionRepo;
    }

    public List<SubscriptionModel> getAllSubscriptions() {
        return subscriptionRepo.findAll();
    }
}
