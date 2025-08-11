package com.vishal.admin_panel.dto;

import lombok.Data;

@Data
public class RegisterRequest {
	private String username;
	private String email;
	private String password;
	private String roleName;

}
