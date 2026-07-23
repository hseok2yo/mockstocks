package com.example.mockstocks.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 프론트 -> 백엔드 캡챠 검증 요청 DTO
 * 프론트에서 axios.post('/api/captcha/verify', { token: captchaToken }) 로 보내는
 * JSON 바디({ "token": "..." })를 그대로 매핑받는 용도
 *
 * Jackson이 JSON -> 객체로 역직렬화할 때 기본 생성자로 빈 객체를 만든 뒤
 * setter(또는 필드 리플렉션)로 값을 채우기 때문에 기본 생성자가 필요함.
 * DTO는 엔티티와 달리 생성을 막을 이유가 없어서 public으로 열어둠.
 */
@Getter
@NoArgsConstructor
public class CaptchaVerifyRequest {

    // 구글 ReCAPTCHA 위젯에서 발급된 토큰값
    private String token;
}
