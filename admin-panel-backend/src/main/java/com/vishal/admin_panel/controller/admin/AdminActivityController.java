package com.vishal.admin_panel.controller.admin;

import com.vishal.admin_panel.dto.UserActivityDTO;
import com.vishal.admin_panel.entity.UserActivity;
import com.vishal.admin_panel.service.UserActivityService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")

public class AdminActivityController {

    private final UserActivityService userActivityService;

    public AdminActivityController(UserActivityService userActivityService) {
        this.userActivityService = userActivityService;
    }

    // GET all activities
    @GetMapping("/activities")
    public ResponseEntity<List<UserActivityDTO>> getActivities() {
        return ResponseEntity.ok(userActivityService.getAllActivities());
    }

    // GET activities by user
    @GetMapping("/user/{userId}")
    public List<UserActivity> getActivitiesByUser(@PathVariable Long userId) {
        return userActivityService.getActivitiesByUser(userId);
    }
}
