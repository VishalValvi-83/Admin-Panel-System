package com.vishal.admin_panel.controller;

import com.vishal.admin_panel.dto.LoginRequest;
import com.vishal.admin_panel.dto.RegisterRequest;
import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.repository.UserRepository;
import com.vishal.admin_panel.service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final UserService userService;
	@Autowired
	private UserRepository userRepository;

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
		try {
			User createdUser = userService.creatUserByAdmin(request);
			return ResponseEntity.ok(createdUser);
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/login")
	public String login(@RequestBody LoginRequest loginRequest) {
		Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
				return "Login successful for user: " + user.getUsername();
			} else {
				return "Invalid password";
			}
		} else {
			return "User not found with email: " + loginRequest.getEmail();
		}

	}
}
