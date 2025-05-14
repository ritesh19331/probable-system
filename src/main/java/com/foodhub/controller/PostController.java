package com.foodhub.controller;

import com.foodhub.dao.UserRepository;
import com.foodhub.dto.PostDto;
import com.foodhub.entity.Post;
import com.foodhub.entity.User;
import com.foodhub.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{postId}/claim")
    public ResponseEntity<Post> claimPost(@PathVariable Long postId,
                                          @RequestParam Long userId) {
        Post post = postService.claimPost(postId, userId);
        return ResponseEntity.ok(post);
    }


    @PostMapping("/{postId}/approve")
    public ResponseEntity<Post> approveClaim(@PathVariable Long postId,
                                             @RequestParam Long ownerId) {
        Post post = postService.approveClaim(postId, ownerId);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/{postId}/reject")
    public ResponseEntity<Post> rejectClaim(@PathVariable Long postId,
                                            @RequestParam Long ownerId) {
        Post post = postService.rejectClaim(postId, ownerId);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/{postId}/picked-up")
    public ResponseEntity<Post> markPickedUp(@PathVariable Long postId,
                                             @RequestParam Long ownerId) {
        Post post = postService.markPickedUp(postId, ownerId);
        return ResponseEntity.ok(post);
    }
}
