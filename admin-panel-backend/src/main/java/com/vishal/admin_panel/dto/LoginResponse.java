package com.vishal.admin_panel.dto;

import lombok.Data;

@Data

public class LoginResponse {

	private Long id;
	private String status;
	private String message;
	private String username;
	private String email;
	private String role;

	public LoginResponse(String status, String message, Long id, String username, String email, String role) {
		this.status = status;
		this.message = message;
		this.id = id;
		this.username = username;
		this.email = email;
		this.role = role;
	}
	public LoginResponse(String status, String message) {
		this.status = status;
		this.message = message;
	}

}
