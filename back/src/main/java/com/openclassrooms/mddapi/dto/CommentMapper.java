package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.CommentModel;

public class CommentMapper {

    public static CommentResponseDTO toDto(CommentModel m) {
        CommentResponseDTO dto = new CommentResponseDTO();
        dto.setId(m.getId());
        dto.setContent(m.getContent());
        dto.setAuthor(new UserDTO(m.getAuthor()));
        dto.setPostId(m.getPost().getId());
        dto.setCreatedAt(m.getCreatedAt()); // ✅ map dates
        dto.setUpdatedAt(m.getUpdatedAt()); // ✅ map dates
        return dto;
    }
}
