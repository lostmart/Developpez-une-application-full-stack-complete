package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.PostModel;

import lombok.Data;

@Data

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private AuthorDTO author;
    private String topic;

    public PostDTO(PostModel post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = new AuthorDTO(post.getAuthor().getId());
        this.topic = post.getTopic();
    }
}
