package com.vishal.admin_panel.dto;

import lombok.Data;

@Data
public class LoginRequest {
	private String email;
	private String password;

	public LoginRequest() {
	}
}
