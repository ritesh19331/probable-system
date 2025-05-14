package com.foodhub.dao;

import com.foodhub.entity.FoodPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodPostRepository extends JpaRepository<FoodPost, Long> {
}
