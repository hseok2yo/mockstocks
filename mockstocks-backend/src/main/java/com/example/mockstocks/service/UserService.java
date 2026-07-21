package com.example.mockstocks.service;

import com.example.mockstocks.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean isIdAvailable(String userId) {
        return !userRepository.existsByUserId(userId);
    }
}
