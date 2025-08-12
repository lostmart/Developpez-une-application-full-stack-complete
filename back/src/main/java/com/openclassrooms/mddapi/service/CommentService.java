package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.CommentModel;
import com.openclassrooms.mddapi.repo.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepo commentRepo;

    /** Create or update a comment (simple version) */
    @Transactional
    public CommentModel save(CommentModel comment) {
        Date now = new Date();
        if (comment.getCreatedAt() == null) {
            comment.setCreatedAt(now);
        }
        comment.setUpdatedAt(now);
        return commentRepo.save(comment);
    }

    /** Get all comments for a post */
    @Transactional(readOnly = true)
    public List<CommentModel> getByPostId(Long postId) {
        return commentRepo.findByPostId(postId);
    }

    /** Delete a single comment */
    @Transactional
    public void deleteById(Long id) {
        commentRepo.deleteById(id);
    }

    /** Optional helpers */
    @Transactional(readOnly = true)
    public long countForPost(Long postId) {
        return commentRepo.countByPostId(postId);
    }

    @Transactional
    public void deleteByPost(Long postId) {
        commentRepo.deleteByPostId(postId);
    }
}
