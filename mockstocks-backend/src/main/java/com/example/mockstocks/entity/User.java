package com.example.mockstocks.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Comment("사용자")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("로그인 아이디 ")
    @Column(nullable = false, unique = true, length = 50)
    private String userId;

    @Comment("사용자 이름 (실명)")
    @Column(nullable = false, length = 30)
    private String username;

    @Comment("화면 표시 닉네임")
    @Column(nullable = false, length = 30)
    private String nickname;

    @Comment("암호화된 비밀번호")
    @Column(nullable = false)
    private String password;

    @Comment("생년월일")
    @Column(nullable = false)
    private LocalDate birthDate;

    @Comment("이메일")
    @Column(nullable = false, unique = true)
    private String email;

    @Comment("휴대폰번호")
    @Column(nullable = false, unique = true, length = 20)
    private String phoneNumber;

    @Comment("권한 (USER/ADMIN)")
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Comment("가입일시")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder
    public User(String userId, String username, String password, LocalDate birthDate,
                String email, String phoneNumber, String nickname) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.birthDate = birthDate;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.nickname = nickname;
    }

    public enum Role {
        USER, ADMIN
    }
}