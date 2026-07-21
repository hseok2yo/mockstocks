package com.example.mockstocks.service;

public interface UserService {

    /**
     * 아이디 사용 가능 여부 확인
     * @param userId 확인할 아이디
     * @return true = 사용 가능, false = 이미 사용중
     */
    boolean isIdAvailable(String userId);
}
