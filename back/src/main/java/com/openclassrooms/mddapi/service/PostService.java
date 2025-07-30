package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.AuthorDTO;
import com.openclassrooms.mddapi.dto.PostCreateRequest;
import com.openclassrooms.mddapi.dto.PostResponseDTO;
import com.openclassrooms.mddapi.model.PostModel;
import com.openclassrooms.mddapi.model.UserModel;
import com.openclassrooms.mddapi.repo.PostRepo;
import com.openclassrooms.mddapi.repo.UserRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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

    public PostModel createPost(PostModel post) {
        return postRepo.save(post);
    }

    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }

    public PostModel createPost(PostCreateRequest dto) {
        UserModel author = userRepo.findById(dto.authorId)
                .orElseThrow(() -> new RuntimeException("Author not found"));

        PostModel post = new PostModel();
        post.setTitle(dto.title);
        post.setContent(dto.content);
        post.setTopic(dto.topic);
        post.setAuthor(author);
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
}