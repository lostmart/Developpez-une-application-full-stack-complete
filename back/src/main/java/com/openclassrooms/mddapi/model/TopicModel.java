package com.openclassrooms.mddapi.model;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "topics")
public class TopicModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Long creator_id;

}
