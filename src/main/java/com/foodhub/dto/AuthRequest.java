package com.foodhub.dto;

public class AuthRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AuthRequest() {} // No-arg constructor

    public AuthRequest(String email, String password) { // All-args constructor
        this.email = email;
        this.password = password;
    }



    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }
}
