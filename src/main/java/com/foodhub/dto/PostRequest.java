package com.foodhub.dto;

import com.foodhub.enums.PostType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {

    private String title;
    

    private String description;
    
    private PostType type;
    
    private Double latitude;
    
    private Double longitude;
    
    private String locationName;
    
    private LocalDateTime expiryDate;
    
    private String image;
}