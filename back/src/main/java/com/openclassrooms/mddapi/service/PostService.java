package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.AuthorDTO;
import com.openclassrooms.mddapi.dto.PostCreateRequest;
import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.dto.PostResponseDTO;
import com.openclassrooms.mddapi.model.PostModel;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.PostRepo;
import com.openclassrooms.mddapi.repo.UserRepo;
import com.openclassrooms.mddapi.security.AuthUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PostService {

    private final PostRepo postRepo;
    private final UserRepo userRepo;

    public PostService(PostRepo postRepo, UserRepo userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    public List<PostModel> getAllPosts() {
        return postRepo.findAll();
    }

    public Optional<PostModel> getPostById(Long id) {
        return postRepo.findById(id);
    }

    // public PostModel createPost(PostModel post) {
    // return postRepo.save(post);
    // }

    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }

    public PostModel createPost(PostCreateRequest dto) {
        Long authenticatedUserId = AuthUtils.getCurrentUserId(); // ✅ Get from token

        UserModel author = userRepo.findById(authenticatedUserId)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        PostModel post = new PostModel();
        post.setTitle(dto.title);
        post.setContent(dto.content);
        post.setTopic(dto.topic);
        post.setAuthor(author); // ✅ Set from token-based user

        return postRepo.save(post);
    }

    public PostResponseDTO mapPostToDTO(PostModel post) {
        PostResponseDTO dto = new PostResponseDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setAuthor(new AuthorDTO(post.getAuthor().getId()));
        dto.setTopic(post.getTopic());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        return dto;
    }

    public List<PostDTO> getPostsByTopicName(String topicName) {
        if (topicName == null || topicName.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Topic name cannot be null or blank");
        }

        List<PostModel> posts = postRepo.findByTopic(topicName);
        return posts.stream()
                .map(PostDTO::new)
                .collect(Collectors.toList());
    }
}