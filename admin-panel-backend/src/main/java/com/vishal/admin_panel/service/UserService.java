package com.vishal.admin_panel.service;

import java.util.List;
import java.util.Optional;

import com.vishal.admin_panel.dto.AnalyticsDto;
import com.vishal.admin_panel.dto.RegisterRequest;
import com.vishal.admin_panel.entity.Role;
import com.vishal.admin_panel.entity.User;

public interface UserService {
	User creatUserByAdmin(RegisterRequest request);

	User updateUser(Long id, User user) throws Exception;

	void deleteUser(Long userId);

	Optional<User> getUserById(Long userId);

	Optional<User> getUserByUsername(String username);

	Optional<User> getUserByEmail(String email);

	List<User> getAllUsers();

	List<User> getUsersByRole(Role role);

	boolean isUsernameExists(String username);

	boolean isEmailExists(String email);

	AnalyticsDto getSystemAnalytics();
}
