package com.example.mockstocks.controller;

import com.example.mockstocks.dto.CaptchaVerifyRequest;
import com.example.mockstocks.dto.CaptchaVerifyResponse;
import com.example.mockstocks.service.CaptchaService;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 캡챠 검증 API 컨트롤러
 *
 * 프론트(LoginPage.jsx)에서 회원가입 진입 전에
 * axios.post('/api/captcha/verify', { token: captchaToken }) 형태로 호출함
 */
@RestController
@RequiredArgsConstructor
public class CaptchaController {

    private static final Logger log = LoggerFactory.getLogger(CaptchaController.class);

    private final CaptchaService captchaService;

    /**
     * 캡챠 토큰 검증 엔드포인트
     *
     * @param request 프론트에서 보낸 캡챠 토큰 { token: "..." }
     * @return 검증 성공 여부 { success: true/false }
     */
    @PostMapping("/api/captcha/verify")
    public CaptchaVerifyResponse verifyCaptcha(@RequestBody CaptchaVerifyRequest request) {
        log.info("캡챠 검증 요청 수신");

        boolean isValid = captchaService.verify(request.getToken());

        if (!isValid) {
            log.warn("캡챠 검증 최종 실패");
        }

        return new CaptchaVerifyResponse(isValid);
    }
}
