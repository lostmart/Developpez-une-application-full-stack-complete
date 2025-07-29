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

    @Column(nullable = false)
    private String name;

}
