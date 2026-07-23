package com.example.mockstocks.service;

import com.example.mockstocks.dto.SignupRequest;
import com.example.mockstocks.entity.User;
import com.example.mockstocks.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean isIdAvailable(String userId) {
        return !userRepository.existsByUserId(userId);
    }

    public void signup(SignupRequest request) {

        if (userRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
//        }




//        userRepository.save(user);
    }
}
