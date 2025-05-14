package com.foodhub.entity;
import com.foodhub.enums.PostStatus;
import com.foodhub.enums.PostType;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    // Many posts belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // One post has one claim
    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL)
    private Claim claim;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Rating> ratings = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private PostType postType;

    @Getter
    @Enumerated(EnumType.STRING)
    private PostStatus postStatus = PostStatus.POSTED;

    @ManyToOne
    private User owner;

    @ManyToOne
    private User claimedBy;

    public String getPostType() {
        return postType.toString();
    }

    public void setPostType(PostType postType) {
        this.postType = postType;
    }

    public void setPostStatus(PostStatus postStatus) {
        this.postStatus = postStatus;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getClaimedBy() {
        return claimedBy;
    }

    public void setClaimedBy(User claimedBy) {
        this.claimedBy = claimedBy;
    }
// Constructors, Getters, Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Claim getClaim() {
        return claim;
    }

    public void setClaim(Claim claim) {
        this.claim = claim;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public PostStatus getPostStatus() {
        return postStatus;
    }
}
