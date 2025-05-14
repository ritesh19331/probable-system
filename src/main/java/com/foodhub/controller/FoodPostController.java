package com.foodhub.controller;

import com.foodhub.entity.FoodPost;
import com.foodhub.service.FoodPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food-posts")
public class FoodPostController {

    @Autowired
    private FoodPostService service;

    @PostMapping
    public ResponseEntity<FoodPost> createPost(@RequestBody FoodPost post) {
        return new ResponseEntity<>(service.create(post), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodPost> updatePost(@PathVariable Long id, @RequestBody  FoodPost post) throws Exception {
        return ResponseEntity.ok(service.update(id, post));
    }

    @GetMapping
    public List<FoodPost> getAllPosts() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodPost> getPostById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
