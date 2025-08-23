package com.vishal.admin_panel.service.impl;

import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.dto.AnalyticsDto;
import com.vishal.admin_panel.dto.RegisterRequest;
import com.vishal.admin_panel.entity.Role;
import com.vishal.admin_panel.repository.RoleRepository;
import com.vishal.admin_panel.repository.UserActivityRepository;
import com.vishal.admin_panel.repository.UserRepository;
import com.vishal.admin_panel.service.UserActivityService;
import com.vishal.admin_panel.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	private final RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserActivityService userActivityService;
	private final UserActivityRepository userActivityRepository;

	private final BCryptPasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
			UserActivityService userActivityService, RoleRepository roleRepository,
			UserActivityRepository userActivityRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.userActivityService = userActivityService;
		this.userActivityRepository = userActivityRepository;
		this.roleRepository = roleRepository;
	}

	public User updateUser(Long id, User updatedUser) throws Exception {
		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + id));

		boolean isModified = false;

		if (updatedUser.getUsername() != null && !updatedUser.getUsername().equals(existingUser.getUsername())) {

			existingUser.setUsername(updatedUser.getUsername());
			isModified = true;
		}

		if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(existingUser.getEmail())) {
			existingUser.setEmail(updatedUser.getEmail());
			isModified = true;
		}

		if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
			if (!passwordEncoder.matches(updatedUser.getPassword(), existingUser.getPassword())) {
				existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
				isModified = true;
			}
		}

		if (updatedUser.getRole() != null &&
				!updatedUser.getRole().equals(existingUser.getRole())) {
			existingUser.setRole(updatedUser.getRole());
			isModified = true;
		}

		if (isModified) {
			existingUser.setUpdatedAt(LocalDateTime.now());
			return userRepository.save(existingUser);
		} else {
			throw new Exception("No changes detected for user with id: " + id
					+ ". The provided data is the same as the existing data.");
		}
	}

	@Override
	public void deleteUser(Long Id) {
		userRepository.deleteById(Id);
	}

	@Override
	public Optional<User> getUserById(Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setPassword(null);

			return Optional.of(user);
		}
		return Optional.empty();
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
	public User creatUserByAdmin(RegisterRequest request) {
		if (userRepository.existsByUsername(request.getUsername())) {
			throw new RuntimeException("Username already taken");
		}
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already taken");
		}

		Role role;
		try {
			role = roleRepository.findByRoleName(request.getRoleName().toUpperCase())
					.orElseThrow(() -> new RuntimeException("Role not found"));
		} catch (IllegalArgumentException e) {
			throw new RuntimeException("Invalid role: " + request.getRoleName());
		}

		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(role);
		user.setCreatedAt(LocalDateTime.now());
		user.setUpdatedAt(LocalDateTime.now());

		User savedUser = userRepository.save(user);

		// Log activity
		userActivityService.logActivity(savedUser, "CREATE", "User registered with role: " + role);

		return savedUser;
	}

	@Override
	public AnalyticsDto getSystemAnalytics() {
		long totalUsers = userRepository.count();
		long totalAdmins = userRepository.countByRole_RoleName("ADMIN");
		long totalActivities = userActivityRepository.count();

		return new AnalyticsDto(totalUsers, totalAdmins, totalActivities);
	}
}
