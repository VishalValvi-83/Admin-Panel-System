package com.vishal.admin_panel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vishal.admin_panel.entity.Role;
import com.vishal.admin_panel.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

	List<User> findByRole(Role role);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);

}
