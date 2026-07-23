package com.example.mockstocks.dto;

import com.example.mockstocks.entity.AgreementRequest;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class SignupRequest {

    private String userId;
    private String username;
    private String nickname;
    private String password;
    private String email;
    private String phone;
    private LocalDate birth;

    private List<AgreementRequest> agreements;
}
