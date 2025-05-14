package com.foodhub.service;

import com.foodhub.dao.PostRepository;
import com.foodhub.dao.UserRepository;
import com.foodhub.entity.Post;
import com.foodhub.entity.User;
import com.foodhub.enums.PostStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post claimPost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!"DONATE".equalsIgnoreCase(post.getPostType())) {
            throw new RuntimeException("Only donation posts can be claimed");
        }

        if (post.getPostStatus() != PostStatus.POSTED) {
            throw new RuntimeException("Post is not available for claiming");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        post.setClaimedBy(user);
        post.setPostStatus(PostStatus.CLAIMED);

        return postRepository.save(post);
    }

    public Post approveClaim(Long postId, Long ownerId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Only owner can approve claim");
        }

        if (post.getPostStatus() != PostStatus.CLAIMED) {
            throw new RuntimeException("Post is not claimed yet");
        }

        post.setPostStatus(PostStatus.PICKED_UP); // or another logic step if needed
        return postRepository.save(post);
    }

    public Post completePost(Long postId, Long ownerId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Only owner can complete the post");
        }

        post.setPostStatus(PostStatus.COMPLETED);
        return postRepository.save(post);
    }

    public Post rejectClaim(Long postId, Long ownerId) {
        Post post = getPost(postId);

        if (!post.getOwner().getId().equals(ownerId))
            throw new IllegalStateException("Only the post owner can reject claims");

        if (post.getPostStatus() != PostStatus.CLAIMED)
            throw new IllegalStateException("Post is not claimed");

        post.setClaimedBy(null);
        post.setPostStatus(PostStatus.REJECTED);
        return postRepository.save(post);
    }

    public Post markPickedUp(Long postId, Long ownerId) {
        Post post = getPost(postId);

        if (!post.getOwner().getId().equals(ownerId))
            throw new IllegalStateException("Only the owner can mark as picked up");

        if (post.getPostStatus() != PostStatus.PICKED_UP)
            throw new IllegalStateException("Post not yet picked up");

        post.setPostStatus(PostStatus.COMPLETED);
        return postRepository.save(post);
    }

    private Post getPost(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
