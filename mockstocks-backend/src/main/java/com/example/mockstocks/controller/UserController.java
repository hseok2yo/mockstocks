package com.example.mockstocks.controller;


import com.example.mockstocks.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * 아이디 중복확인
     * GET /api/users/check-id?userId=xxx
     */
    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkIdAvailable(@RequestParam String userId) {
        return ResponseEntity.ok(userService.isIdAvailable(userId));
    }
}
