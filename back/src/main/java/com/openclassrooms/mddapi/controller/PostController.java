package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostCreateRequest;
import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.dto.PostResponseDTO;
import com.openclassrooms.mddapi.model.PostModel;
import com.openclassrooms.mddapi.service.PostService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

/*
 * Controller that handles post operations
 */

@PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts().stream()
                .map(PostDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostModel> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostCreateRequest request) {
        PostModel savedPost = postService.createPost(request);
        PostResponseDTO response = postService.mapPostToDTO(savedPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // @PutMapping("/{id}")
    // public PostModel updatePost(@PathVariable Long id, @RequestBody PostModel
    // post) {
    // post.setId(id); // Ensure the correct ID is set
    // return postService.updatePost(post);
    // }

    @GetMapping("/topic-name/{topicName}")
    public ResponseEntity<List<PostDTO>> getPostsByTopicName(@PathVariable String topicName) {
        return ResponseEntity.ok(postService.getPostsByTopicName(topicName));
    }
}
