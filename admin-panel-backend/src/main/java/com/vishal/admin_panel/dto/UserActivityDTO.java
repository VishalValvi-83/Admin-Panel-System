package com.vishal.admin_panel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityDTO {
    private Long id;
    private String username;
    private String role;
    private String action;
    private String details;
    private LocalDateTime timestamp;
}
