package com.foodhub.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingRequest {
    
    private Long postId;
    
    private Long ratedId;

    private Integer rating;
    
    private String comment;
}