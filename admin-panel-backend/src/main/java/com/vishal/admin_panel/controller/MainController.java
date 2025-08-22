package com.vishal.admin_panel.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.entity.UserActivity;
import com.vishal.admin_panel.service.UserActivityService;
import com.vishal.admin_panel.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
public class MainController {

    private final UserActivityService userActivityService;
    private final UserService userService;

    @GetMapping("/{userId}/activities")
    public List<UserActivity> getActivitiesByUser(@PathVariable Long userId) {
        return userActivityService.getActivitiesByUser(userId);
    }

    @GetMapping("/{userId}")
    public Optional<User> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

}
