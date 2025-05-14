package com.foodhub.dto;

import java.util.List;

public class PostDto {
    private Long id;
    private Long ownerId;
    private String content;
    private boolean isOwner; // determine from token

    public List<ClaimRequestDto> getClaimRequests() {
        return claimRequests;
    }

    public void setClaimRequests(List<ClaimRequestDto> claimRequests) {
        this.claimRequests = claimRequests;
    }

    public boolean isOwner() {
        return isOwner;
    }

    public void setOwner(boolean owner) {
        isOwner = owner;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private List<ClaimRequestDto> claimRequests; // include only if isOwner = true
}
