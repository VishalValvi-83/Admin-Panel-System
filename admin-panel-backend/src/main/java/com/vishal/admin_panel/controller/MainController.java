package com.vishal.admin_panel.controller;

import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
public class MainController {

	private final UserService userService;

	@GetMapping("/{userId}")
	public Optional<User> getUserById(@PathVariable Long userId) {
		return userService.getUserById(userId);
	}

	@PutMapping("/update/{id}")
	public User updateUser(@PathVariable Long id, @RequestBody User user) {
		try {
			return userService.updateUser(id, user);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error updating user: " + e.getMessage());
		}
		return user;
	}

	// @GetMapping("/all")
	// public List<User> getAllUsers() {
	// 	return userService.getAllUsers();
	// }

}
