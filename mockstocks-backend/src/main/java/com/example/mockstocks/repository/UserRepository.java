package com.example.mockstocks.repository;

import com.example.mockstocks.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
}
