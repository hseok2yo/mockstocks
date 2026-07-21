package com.example.mockstocks.controller;

import com.example.mockstocks.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email") // 실제 매핑 경로에 맞게 수정
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    /**
     * 이메일로 인증코드 발송
     * 요청 예시: { "email": "test@example.com" }
     */
    @PostMapping("/send-code")
    public ResponseEntity<Void> sendCode(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        log.info("[인증코드 발송 요청] email={}", email);

        try {
            emailVerificationService.sendVerificationCode(email);
            log.info("[인증코드 발송 완료] email={}", email);
        } catch (Exception e) {
            // 메일 서버 오류, 잘못된 이메일 형식 등 발송 실패 시
            log.error("[인증코드 발송 실패] email={}, error={}", email, e.getMessage(), e);
            throw e; // 필요하면 커스텀 예외로 감싸서 던지기
        }

        return ResponseEntity.ok().build();
    }

    /**
     * 인증코드 검증
     * 요청 예시: { "email": "test@example.com", "code": "123456" }
     */
    @PostMapping("/verify-code")
    public ResponseEntity<Boolean> verifyCode(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String code = body.get("code");
        log.info("[인증코드 검증 요청] email={}, code={}", email, code);

        boolean isValid = emailVerificationService.verifyCode(email, code);

        if (isValid) {
            log.info("[인증코드 검증 성공] email={}", email);
        } else {
            log.warn("[인증코드 검증 실패] email={}", email);
        }

        return ResponseEntity.ok(isValid);
    }
}