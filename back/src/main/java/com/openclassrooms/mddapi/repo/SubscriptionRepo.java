package com.openclassrooms.mddapi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.SubscriptionModel;

public interface SubscriptionRepo extends JpaRepository<SubscriptionModel, Long> {

    SubscriptionModel findByUserIdAndTopicName(Long user_id, String topicName);

    List<SubscriptionModel> findByUserId(Long userId);

    List<SubscriptionModel> findByTopicName(String topicName);

}
