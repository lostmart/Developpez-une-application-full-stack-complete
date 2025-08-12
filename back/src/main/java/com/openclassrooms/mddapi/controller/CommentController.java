package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentCreateRequest;

import com.openclassrooms.mddapi.dto.CommentMapper;
import com.openclassrooms.mddapi.dto.CommentResponseDTO;
import com.openclassrooms.mddapi.model.CommentModel;
import com.openclassrooms.mddapi.model.PostModel;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.UserRepo;
import com.openclassrooms.mddapi.security.AuthUtils;
import com.openclassrooms.mddapi.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor

public class CommentController {

    private final CommentService commentService;
    private final UserRepo userRepo;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDTO createComment(@RequestBody CommentCreateRequest dto) {
        Long userId = AuthUtils.getCurrentUserId();

        UserModel author = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        PostModel post = new PostModel();
        post.setId(dto.getPostId());

        CommentModel toSave = new CommentModel();
        toSave.setContent(dto.getContent());
        toSave.setAuthor(author); // ✅ from token
        toSave.setPost(post);

        CommentModel saved = commentService.save(toSave);
        return CommentMapper.toDto(saved); // ✅ return DTO, not entity
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponseDTO> getByPost(@PathVariable Long postId) {
        return commentService.getByPostId(postId)
                .stream()
                .map(CommentMapper::toDto) // ✅ DTO mapping
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        commentService.deleteById(id);
    }
}
