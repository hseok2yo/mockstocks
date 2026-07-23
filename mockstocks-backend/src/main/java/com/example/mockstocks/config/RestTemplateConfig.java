package com.example.mockstocks.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * RestTemplate 빈 등록
 *
 * 프로젝트에 이미 RestTemplate 빈이 등록되어 있다면 (예: 다른 외부 API 호출용으로)
 * 이 클래스는 넣지 않아도 됨. 오히려 넣으면 빈 이름 충돌 나서 빌드 에러 남.
 * EmailVerificationService 쪽에 혹시 RestTemplate/WebClient가 이미 있는지 먼저 확인할 것.
 */
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
