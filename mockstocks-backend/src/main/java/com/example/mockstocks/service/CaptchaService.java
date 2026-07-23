package com.example.mockstocks.service;

import com.example.mockstocks.dto.GoogleSiteVerifyResponse;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * 구글 reCAPTCHA 토큰 서버 검증 서비스
 *
 * 프론트에서 캡챠를 통과해도 그건 "클라이언트가 그렇다고 주장"하는 것뿐이라
 * 실제로는 이 서비스가 구글 siteverify API에 토큰을 다시 보내서
 * "이 토큰이 진짜 구글이 발급한, 아직 만료 안 된 유효한 토큰인지"를 재확인한다.
 *
 * @RequiredArgsConstructor
 * -> final 필드(restTemplate)를 매개변수로 받는 생성자를 롬복이 자동으로 만들어줌
 *    (직접 생성자 안 써도 스프링이 그 생성자로 의존성 주입해줌)
 */
@Service
@RequiredArgsConstructor
public class CaptchaService {

    private static final Logger log = LoggerFactory.getLogger(CaptchaService.class);

    // 구글 reCAPTCHA secret key
    // 절대 프론트로 내려가면 안 됨 (site key와 다른 값, 서버에만 존재해야 함)
    // application.properties에 recaptcha.secret-key=... 로 등록해서 주입받음
    // 이 값이 들어있는 프로퍼티 파일은 git에 커밋 금지 (.gitignore 처리 필수)
    @Value("${recaptcha.secret-key}")
    private String secretKey;

    // 구글에서 제공하는 캡챠 검증 전용 엔드포인트 (고정 URL, 변경 안 됨)
    private static final String GOOGLE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    // final -> RequiredArgsConstructor가 이 필드를 받는 생성자를 만들어서 주입해줌
    private final RestTemplate restTemplate;

    /**
     * 프론트에서 받은 캡챠 토큰을 구글 siteverify API로 검증한다.
     *
     * @param token 프론트(ReCAPTCHA 위젯)에서 발급된 토큰. 회원가입 등 요청과 함께 넘어옴
     * @return 검증 성공 여부 (true = 유효한 토큰, false = 무효/만료/오류)
     */
    public boolean verify(String token) {
        if (token == null || token.isBlank()) {
            log.warn("캡챠 검증 요청 - 토큰이 비어있음");
            return false;
        }

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", secretKey);
        params.add("response", token);

        try {
            //이 URL로 POST 요청을 보내고, 응답을 이 타입의 객체로 변환해서 받아오기
            GoogleSiteVerifyResponse response =
                    restTemplate.postForObject(GOOGLE_VERIFY_URL, params, GoogleSiteVerifyResponse.class);

            if (response == null) {
                log.error("캡챠 검증 실패 - 구글 응답이 null (네트워크 문제 가능성)");
                return false;
            }

            if (!response.isSuccess()) {
                log.warn("캡챠 검증 실패 - errorCodes: {}", response.getErrorCodes());
                return false;
            }

            log.info("캡챠 검증 성공 - hostname: {}", response.getHostname());
            return true;

        } catch (Exception e) {
            log.error("캡챠 검증 중 예외 발생", e);
            return false;
        }
    }
}
