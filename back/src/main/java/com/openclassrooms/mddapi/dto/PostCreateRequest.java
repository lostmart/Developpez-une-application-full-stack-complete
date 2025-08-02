package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class PostCreateRequest {
    public String title;
    public String content;
    public String topic;

    @JsonIgnore
    public Long authorId; // we do not accept user id from the frontend ❌
}
