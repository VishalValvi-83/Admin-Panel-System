package com.vishal.admin_panel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.vishal.admin_panel")
@EnableJpaRepositories(basePackages = "com.vishal.admin_panel.repository")
public class AdminPanelApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminPanelApplication.class, args);
		System.out.println("=======================*************************=======================");
		System.out.println("		Admin Panel Application Started Successfully!");
		System.out.println("=======================*************************=======================");
	}

}
