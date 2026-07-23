package com.example.mockstocks.exception;

import lombok.Getter;

@Getter
public class SignupException extends RuntimeException {

    private final String errorCode;

    public SignupException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}