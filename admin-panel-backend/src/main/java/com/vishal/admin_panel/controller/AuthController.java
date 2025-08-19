package com.vishal.admin_panel.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.admin_panel.dto.LoginRequest;
import com.vishal.admin_panel.dto.LoginResponse;
import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest loginRequest) {
		Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
		if (userOptional.isEmpty()) {
			return new LoginResponse("error", "User not found with email: " + loginRequest.getEmail());
		}
		User user = userOptional.get();
		if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			return new LoginResponse("error", "Invalid password");
		}

		return new LoginResponse("success", "Login successful", user.getId(), user.getUsername(), user.getEmail(),
				user.getRole().getRoleName());
	}

}
