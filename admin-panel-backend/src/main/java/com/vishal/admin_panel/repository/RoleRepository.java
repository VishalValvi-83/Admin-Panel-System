package com.vishal.admin_panel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vishal.admin_panel.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>  {
	
    Optional<Role> findByRoleName(String roleName);
}
