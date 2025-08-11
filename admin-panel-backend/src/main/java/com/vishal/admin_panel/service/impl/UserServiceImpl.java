package com.vishal.admin_panel.service.impl;

import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.dto.RegisterRequest;
import com.vishal.admin_panel.entity.Role;
import com.vishal.admin_panel.repository.RoleRepository;
import com.vishal.admin_panel.repository.UserRepository;

import com.vishal.admin_panel.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	private final BCryptPasswordEncoder passwordEncoder;
	private final RoleRepository roleRepository;
	
	public UserServiceImpl(UserRepository userRepository,
			RoleRepository roleRepository,
			BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

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

	@Override
	public User registerUser(RegisterRequest request) {
		if (userRepository.existsByUsername(request.getUsername())) {
			throw new RuntimeException("Username already taken");
		}
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already taken");
		}

		Role role = roleRepository.findByRoleName(request.getRoleName())
				.orElseThrow(() -> new RuntimeException("Role not found"));

		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(role);
		user.setCreatedAt(LocalDateTime.now());
		user.setUpdatedAt(LocalDateTime.now());
		return userRepository.save(user);
	}
}
