package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private String content;
    private Long authorId;
    private Long postId;
}
