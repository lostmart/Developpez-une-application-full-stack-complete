package com.openclassrooms.mddapi.dto;

import lombok.Data;

import java.util.Date; // ✅ not java.sql.Date

@Data
public class CommentResponseDTO {
    private Long id;
    private String content;
    private UserDTO author;
    private Long postId;
    private Date createdAt; // ✅ util.Date
    private Date updatedAt; // ✅ util.Date
}
