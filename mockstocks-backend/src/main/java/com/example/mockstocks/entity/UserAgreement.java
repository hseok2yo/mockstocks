package com.example.mockstocks.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_agreements")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserAgreement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "agreement_type", nullable = false, length = 50)
    private String agreementType;

    @Column(name = "is_agreed", nullable = false)
    private boolean agreed;

    @Column(name = "agreed_at", nullable = false)
    private LocalDateTime agreedAt;

    @Column(name = "terms_version", length = 20)
    private String termsVersion;

    @Builder
    public UserAgreement(User user, String agreementType, boolean agreed,
                         LocalDateTime agreedAt, String termsVersion) {
        this.user = user;
        this.agreementType = agreementType;
        this.agreed = agreed;
        this.agreedAt = agreedAt;
        this.termsVersion = termsVersion;
    }
}
