package com.example.mockstocks.service.impl;

import com.example.mockstocks.repository.UserRepository;
import com.example.mockstocks.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean isIdAvailable(String userId) {
        return !userRepository.existsByUserId(userId);
    }
}
