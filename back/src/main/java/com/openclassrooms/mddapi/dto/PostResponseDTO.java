package com.openclassrooms.mddapi.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PostResponseDTO {

    private Long id;
    private String title;
    private String content;
    private AuthorDTO author;
    private String topic;
    private Date createdAt;
    private Date updatedAt;

}
