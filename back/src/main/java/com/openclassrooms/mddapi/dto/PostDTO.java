package com.openclassrooms.mddapi.dto;

import java.sql.Date;

import com.openclassrooms.mddapi.model.PostModel;

import lombok.Data;

@Data

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private AuthorDTO author;
    private String topic;
    private Date createdAt;

    public PostDTO(PostModel post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = new AuthorDTO(post.getAuthor().getId(), post.getAuthor().getUsername());
        this.topic = post.getTopic();
        this.createdAt = new java.sql.Date(post.getCreatedAt().getTime());
    }
}
