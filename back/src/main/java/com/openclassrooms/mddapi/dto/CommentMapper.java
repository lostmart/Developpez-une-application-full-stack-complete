package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.CommentModel;

public class CommentMapper {

    public static CommentResponseDTO toDto(CommentModel m) {
        CommentResponseDTO dto = new CommentResponseDTO();
        dto.setId(m.getId());
        dto.setContent(m.getContent());
        dto.setAuthor(new UserDTO(m.getAuthor())); // ✅ wrap entity in your DTO
        dto.setPostId(m.getPost().getId());
        return dto;
    }
}