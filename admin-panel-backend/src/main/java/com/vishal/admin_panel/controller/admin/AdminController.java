package com.vishal.admin_panel.controller.admin;

import java.util.List;

 import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.admin_panel.dto.AnalyticsDto;
import com.vishal.admin_panel.dto.RegisterRequest;
import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserService userService;

    @GetMapping("/test")
    public String test() {
        return "Controller is working!";
    }

    @PostMapping("/create-user")
    public User createUser(@RequestBody RegisterRequest dto) {
        return userService.creatUserByAdmin(dto);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/analytics")
    public AnalyticsDto getSystemAnalytics() {
        return userService.getSystemAnalytics();
    }
}
