package com.foodhub.service;

import com.foodhub.dao.FoodPostRepository;
import com.foodhub.entity.FoodPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodPostService {

    @Autowired
    private FoodPostRepository repository;

    public FoodPost create(FoodPost post) {
        return repository.save(post);
    }

    public FoodPost update(Long id, FoodPost updated) throws Exception {
        FoodPost post = repository.findById(id)
            .orElseThrow(() -> new Exception("Post not found"));

        post.setType(updated.getType());
        post.setDescription(updated.getDescription());
        post.setQuantity(updated.getQuantity());
        post.setLocation(updated.getLocation());
        post.setExpiryDate(updated.getExpiryDate());
        post.setStatus(updated.getStatus());

        return repository.save(post);
    }

    public List<FoodPost> getAll() {
        return repository.findAll();
    }

    public FoodPost getById(Long id) throws Exception {
        return repository.findById(id)
            .orElseThrow(() -> new Exception("Post not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
