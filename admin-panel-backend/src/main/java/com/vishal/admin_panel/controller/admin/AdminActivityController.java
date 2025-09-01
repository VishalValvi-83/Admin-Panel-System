package com.vishal.admin_panel.controller.admin;

import com.vishal.admin_panel.entity.UserActivity;
import com.vishal.admin_panel.service.UserActivityService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/activities")
@PreAuthorize("hasRole('ADMIN')")
public class AdminActivityController {

    private final UserActivityService userActivityService;

    public AdminActivityController(UserActivityService userActivityService) {
        this.userActivityService = userActivityService;
    }

    // GET activities by user
    @GetMapping("/user/{userId}")
    public List<UserActivity> getActivitiesByUser(@PathVariable Long userId) {
        return userActivityService.getActivitiesByUser(userId);
    }
}
