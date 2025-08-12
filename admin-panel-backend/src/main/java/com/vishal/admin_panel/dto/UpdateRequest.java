package com.vishal.admin_panel.dto;

import lombok.Data;

@Data
public class UpdateRequest {
    private String username;
    private String password;
    private String email;
    private String role;
}
