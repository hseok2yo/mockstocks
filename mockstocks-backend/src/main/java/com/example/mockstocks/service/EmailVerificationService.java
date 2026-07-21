package com.example.mockstocks.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final JavaMailSender mailSender;

    // 이메일별 인증코드+만료시간 저장
    // - key: 이메일, value: (코드, 만료시각)
    // - 서버 재시작 시 초기화됨 -> 운영 환경에서는 Redis 등 외부 저장소로 교체 권장
    //   (서버 여러 대로 스케일아웃하면 인스턴스마다 저장소가 달라서 검증 실패할 수 있음)
    private final Map<String, VerificationCode> codeStore = new ConcurrentHashMap<>();

    private record VerificationCode(String code, LocalDateTime expireAt) {}

    /**
     * 인증코드 생성 후 이메일 발송
     * - 코드는 3분간 유효
     * - 같은 이메일로 재요청 시 기존 코드는 덮어씌워짐(재발급)
     */
    public void sendVerificationCode(String email) {
        String code = generateCode();
        LocalDateTime expireAt = LocalDateTime.now().plusMinutes(3);
        codeStore.put(email, new VerificationCode(code, expireAt));

        log.debug("[인증코드 생성] email={}, code={}, expireAt={}", email, code, expireAt);
        // 운영 환경에서는 code 자체를 로그에 남기지 않는 걸 권장 (보안상 민감정보)
        // 여기서는 개발 편의를 위해 DEBUG 레벨로만 남김

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[MOCKSTOCKS] 이메일 인증번호");
        message.setText("인증번호는 [" + code + "] 입니다. 3분 이내에 입력해주세요.");

        try {
            mailSender.send(message);
            log.info("[메일 발송 성공] email={}", email);
        } catch (Exception e) {
            // SMTP 연결 실패, 인증 오류 등
            log.error("[메일 발송 실패] email={}, error={}", email, e.getMessage(), e);
            throw e; // 상위(Controller)로 전파해서 응답 처리하도록
        }
    }

    /**
     * 인증코드 검증
     * 순서: 저장된 코드 존재 확인 -> 만료 확인 -> 코드 일치 확인
     * 검증 성공/실패 관계없이 만료된 코드는 저장소에서 제거해 메모리 누수 방지
     */
    public boolean verifyCode(String email, String inputCode) {
        log.info("[인증코드 검증 시도] email={}, inputCode={}", email, inputCode);

        VerificationCode saved = codeStore.get(email);

        if (saved == null) {
            // 발송 이력이 없거나 이미 검증(제거)된 경우
            log.warn("[검증 실패-코드없음] email={}, inputCode={}", email, inputCode);
            return false;
        }

        if (LocalDateTime.now().isAfter(saved.expireAt())) {
            // 만료된 코드는 저장소에서 제거
            codeStore.remove(email);
            log.warn("[검증 실패-만료] email={}, inputCode={}, savedCode={}, expireAt={}",
                    email, inputCode, saved.code(), saved.expireAt());
            return false;
        }

        if (!saved.code().equals(inputCode)) {
            log.warn("[검증 실패-코드불일치] email={}, inputCode={}, savedCode={}",
                    email, inputCode, saved.code());
            return false;
        }

        // 검증 성공 시 재사용 방지를 위해 저장소에서 제거 (1회용 코드)
        codeStore.remove(email);
        log.info("[검증 성공] email={}, inputCode={}", email, inputCode);
        return true;
    }

    /**
     * 6자리 숫자 인증코드 생성 (100000 ~ 999999)
     */
    private String generateCode() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }
}