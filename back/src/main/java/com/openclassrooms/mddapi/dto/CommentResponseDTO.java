package com.openclassrooms.mddapi.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class CommentResponseDTO {
    private Long id;
    private String content;
    private UserDTO author;
    private Long postId;
    private Date createdAt;
    private Date updatedAt;
}
