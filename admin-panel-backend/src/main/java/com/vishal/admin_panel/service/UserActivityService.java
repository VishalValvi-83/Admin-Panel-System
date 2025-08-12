package com.vishal.admin_panel.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vishal.admin_panel.dto.UserActivityDTO;
import com.vishal.admin_panel.entity.User;
import com.vishal.admin_panel.entity.UserActivity;
import com.vishal.admin_panel.repository.UserActivityRepository;

@Service
public class UserActivityService {

    @Autowired
    private UserActivityRepository userActivityRepository;

    public void logActivity(User user, String action, String details) {
        UserActivity activity = UserActivity.builder()
                .username(user.getUsername())
                .role(user.getRole().getRoleName())
                .action(action)
                .details(details)
                .user(user)
                .timestamp(LocalDateTime.now())
                .build();

        userActivityRepository.save(activity);
    }

    public UserActivityService(UserActivityRepository repository) {
        this.userActivityRepository = repository;
    }

    public List<UserActivityDTO> getAllActivities() {
        return userActivityRepository.findAll()
                .stream()
                .map(activity -> new UserActivityDTO(
                        activity.getId(),
                        activity.getUsername(),
                        activity.getRole(),
                        activity.getAction(),
                        activity.getDetails(),
                        activity.getTimestamp()))
                .collect(Collectors.toList());
    }

    public List<UserActivity> getActivitiesByUser(Long userId) {
        return userActivityRepository.findByUserId(userId);
    }

    public void saveActivity(UserActivity activity) {
        userActivityRepository.save(activity);
    }
}
