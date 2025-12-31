package com.insurai.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String FullName;
    private String email;
    private String password;
    private String role;
}
