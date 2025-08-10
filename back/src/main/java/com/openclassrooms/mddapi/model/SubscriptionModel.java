package com.openclassrooms.mddapi.model;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "user_subscriptions")
public class SubscriptionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "topic_name", nullable = false)
    private String topicName;

    @Column(name = "description", nullable = false)
    private String description;

}
