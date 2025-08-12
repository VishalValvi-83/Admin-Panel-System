package com.vishal.admin_panel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnalyticsDto {
    private long totalUsers;
    private long totalAdmins;
    private long totalActivities;
}
