package com.example.mockstocks.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 구글 siteverify API 응답을 매핑하는 DTO
 * 실제 구글 응답 예시:
 * {
 *   "success": true,
 *   "challenge_ts": "2026-07-23T10:00:00Z",
 *   "hostname": "example.com",
 *   "error-codes": []
 * }
 *
 * @JsonIgnoreProperties(ignoreUnknown = true)
 * -> 구글이 나중에 필드를 추가해도 여기 정의 안 된 필드는 무시하고 에러 안 나게 방어
 */
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleSiteVerifyResponse {

    // 토큰이 유효한지 여부 (이게 핵심 판단 기준)
    private boolean success;

    // 캡챠를 통과한 시각 (ISO 8601 형식 문자열)
    private String challengeTs;

    // 캡챠가 실행된 도메인 (site key에 등록한 도메인과 일치하는지 확인용으로도 쓸 수 있음)
    private String hostname;

    // 실패했을 때 구글이 내려주는 에러 코드 목록
    // 예: invalid-input-secret, invalid-input-response, timeout-or-duplicate 등
    // 주의: 구글 JSON 응답 필드명은 "error-codes"(하이픈)라 @JsonProperty로 명시 매핑 필요
    @JsonProperty("error-codes")
    private List<String> errorCodes;

    // challenge_ts도 구글 원본 필드명이 스네이크케이스라 명시 매핑
    @JsonProperty("challenge_ts")
    public void setChallengeTs(String challengeTs) {
        this.challengeTs = challengeTs;
    }
}
