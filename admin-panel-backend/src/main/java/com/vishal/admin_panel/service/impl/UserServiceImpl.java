package com.vishal.admin_panel.service.impl;

import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.entity.Role;

import com.vishal.admin_panel.repository.UserRepository;

import com.vishal.admin_panel.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	public User updateUser(Long id, User updatedUser) {
		Optional<User> optionalUser = userRepository.findById(id);

		if (optionalUser.isPresent()) {
			User existingUser = optionalUser.get();

			existingUser.setUsername(updatedUser.getUsername());
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setPassword(updatedUser.getPassword());
			existingUser.setRole(updatedUser.getRole());
			existingUser.setUpdatedAt(LocalDateTime.now());

			return userRepository.save(existingUser);
		} else {
			throw new RuntimeException("User not found with id: " + id);
		}
	}

	@Override
	public void deleteUser(Long Id) {
		userRepository.deleteById(Id);
	}

	@Override
	public Optional<User> getUserById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public Optional<User> getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public List<User> getUsersByRole(Role role) {
		return userRepository.findByRole(role);
	}

	@Override
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public boolean isUsernameExists(String username) {
		return userRepository.existsByUsername(username);
	}

	@Override
	public boolean isEmailExists(String email) {
		return userRepository.existsByEmail(email);
	}
}
