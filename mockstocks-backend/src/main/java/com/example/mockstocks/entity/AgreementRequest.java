package com.example.mockstocks.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgreementRequest {

    private String agreementType;   // "terms", "privacy", "marketing" 등
    private Boolean agreed;
    private String termsVersion;
}
