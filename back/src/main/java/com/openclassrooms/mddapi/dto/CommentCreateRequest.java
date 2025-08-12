package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CommentCreateRequest {
    private String content;
    private Long postId;
}
