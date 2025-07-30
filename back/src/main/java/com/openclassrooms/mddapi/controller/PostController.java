package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostCreateRequest;
import com.openclassrooms.mddapi.model.PostModel;
import com.openclassrooms.mddapi.service.PostService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<PostModel> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostModel> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PostModel> createPost(@RequestBody PostCreateRequest request) {
        PostModel createdPost = postService.createPost(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
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
}
