package com.example.mockstocks.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;

/**
 * 백엔드 -> 프론트 캡챠 검증 응답 DTO
 * 프론트에서는 res.data.success 로 확인함
 *
 * 이건 컨트롤러가 값 채워서 바로 반환하는 용도라 기본 생성자 대신
 * 필드값 받는 생성자(AllArgsConstructor)만 열어둠 -> new CaptchaVerifyResponse(true) 형태로 생성
 */
@Getter
@AllArgsConstructor
public class CaptchaVerifyResponse {

    // 캡챠 검증 최종 성공 여부 (true = 통과, false = 실패)
    private boolean success;
}
