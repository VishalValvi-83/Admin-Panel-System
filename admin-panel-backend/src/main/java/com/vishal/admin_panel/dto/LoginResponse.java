package com.vishal.admin_panel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
	private String status;
	private String message;
	private Long id;
	private String username;
	private String email;
	private String role;

}
