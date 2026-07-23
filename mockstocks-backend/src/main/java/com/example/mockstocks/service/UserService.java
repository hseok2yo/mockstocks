package com.example.mockstocks.service;

import com.example.mockstocks.dto.SignupRequest;
import com.example.mockstocks.entity.AgreementRequest;
import com.example.mockstocks.entity.User;
import com.example.mockstocks.entity.UserAgreement;
import com.example.mockstocks.exception.SignupException;
import com.example.mockstocks.repository.UserAgreementRepository;
import com.example.mockstocks.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserAgreementRepository userAgreementRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean isIdAvailable(String userId) {
        return !userRepository.existsByUserId(userId);
    }

    public void signup(SignupRequest request) {

        if (userRepository.existsByUserId(request.getUserId())) {
            throw new SignupException("DUPLICATE_USER_ID", "이미 사용 중인 아이디입니다.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new SignupException("DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다.");
        }

        if (userRepository.existsByPhoneNumber(request.getPhone())) {
            throw new SignupException("DUPLICATE_PHONE", "이미 사용 중인 휴대폰번호입니다.");
        }
        // 1. 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 2. User 엔티티 생성 (필드명 매핑 주의: birth -> birthDate, phone -> phoneNumber)
        User user = User.builder()
                .userId(request.getUserId())
                .username(request.getUsername())
                .nickname(request.getNickname())
                .password(encodedPassword)
                .birthDate(request.getBirth())
                .email(request.getEmail())
                .phoneNumber(request.getPhone())
                .build();

        userRepository.save(user);

        // 3. 동의 항목 저장
        List<UserAgreement> agreements = new ArrayList<>();

        for (AgreementRequest a : request.getAgreements()) {
            UserAgreement agreement = UserAgreement.builder()
                    .user(user)
                    .agreementType(a.getAgreementType())
                    .agreed(a.getAgreed())
                    .agreedAt(LocalDateTime.now())
                    .termsVersion(a.getTermsVersion())
                    .build();

            agreements.add(agreement);
        }

        userAgreementRepository.saveAll(agreements);


    }
}
