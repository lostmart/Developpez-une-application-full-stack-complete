package com.openclassrooms.mddapi.repo;

import com.openclassrooms.mddapi.model.CommentModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<CommentModel, Long> {
    List<CommentModel> findByPostId(Long postId);

    long countByPostId(Long postId);

    void deleteByPostId(Long postId);
}
