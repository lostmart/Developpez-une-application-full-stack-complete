package com.openclassrooms.mddapi.repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.openclassrooms.mddapi.model.SubscriptionModel;

public interface SubscriptionRepo extends JpaRepository<SubscriptionModel, Long> {

    SubscriptionModel findByUserIdAndTopicName(Long user_id, String topicName);

    List<SubscriptionModel> findByUserId(Long userId);

    List<SubscriptionModel> findByTopicName(String topicName);

    @Modifying
    @Transactional
    @Query("DELETE FROM SubscriptionModel s WHERE s.userId = :userId AND s.topicName = :topicName")
    int deleteByUserIdAndTopicName(@Param("userId") Long userId, @Param("topicName") String topicName);

}
