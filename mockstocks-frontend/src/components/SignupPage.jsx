import '@/css/AuthHeader.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignupForm, useTermsAgreement, useSignup } from '@/hooks/signupPage/useSignupForm';
import { useVerification } from "@/hooks/common/useVerification";

function SignupPage() {
  // 여러 개였던 state를 객체 하나로 통합
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
    passwordCheck: "",
    name: "",
    birth: "",
    email: "",
    phone: "",
  });

  // 공통으로 쓸 변경 핸들러 - 필드 이름만 다르게 넘기면 됨
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const { userId, handleUserIdChange, idError, isIdVerified, handleCheckId } = useSignupForm();
  const { agreements, allChecked, isRequiredAgreed, handleAllCheck, handleSingleCheck } = useTermsAgreement();
  const emailVerify = useVerification(180);
  const { errors, handleSubmit } = useSignup();



  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/login" className="back-button">← 로그인으로 돌아가기</Link>
        <h2>회원가입</h2>
        <p className="auth-subtitle">회원 정보를 입력해주세요.</p>

        <form className="auth-form">
          {/* 아이디 - useSignupForm 훅 소유라 그대로 */}
          <label className="auth-label" htmlFor="signup-id">아이디</label>
          <div className="input-with-button">
            <input
              id="signup-id"
              className="auth-input"
              type="text"
              placeholder="아이디 입력"
              value={userId}
              onChange={(e) => handleUserIdChange(e.target.value)}
            />
            <button type="button" className="verify-button" onClick={handleCheckId} disabled={isIdVerified}>
              중복확인
            </button>
          </div>
          {idError ? (
            <p style={{ color: isIdVerified ? "green" : "red", margin: "0" }}>{idError}</p>
          ) : errors.id ? (
            <p style={{ color: "red", margin: "0" }}>{errors.id}</p>
          ) : null}

          {/* 닉네임 - formData.nickname으로 변경 */}
          <label className="auth-label" htmlFor="signup-nickname">닉네임</label>
          <input
            id="signup-nickname"
            className="auth-input"
            type="text"
            placeholder="닉네임 입력"
            value={formData.nickname}
            onChange={handleChange("nickname")}
          />
          {errors.nickname && <p style={{ color: "red", margin: "0" }}>{errors.nickname}</p>}

          {/* 비밀번호 */}
          <label className="auth-label" htmlFor="signup-password">비밀번호</label>
          <input
            id="signup-password"
            className="auth-input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={formData.password}
            onChange={handleChange("password")}
          />
          {errors.password && <p style={{ color: "red", margin: "0" }}>{errors.password}</p>}

          {/* 비밀번호 확인 */}
          <label className="auth-label" htmlFor="signup-password-check">비밀번호 확인</label>
          <input
            id="signup-password-check"
            className="auth-input"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.passwordCheck}
            onChange={handleChange("passwordCheck")}
          />
          {errors.passwordCheck && <p style={{ color: "red", margin: "0" }}>{errors.passwordCheck}</p>}

          {/* 이름 */}
          <label className="auth-label" htmlFor="signup-name">이름</label>
          <input
            id="signup-name"
            className="auth-input"
            type="text"
            placeholder="홍길동"
            value={formData.name}
            onChange={handleChange("name")}
          />
          {errors.name && <p style={{ color: "red", margin: "0" }}>{errors.name}</p>}

          {/* 생년월일 */}
          <label className="auth-label" htmlFor="signup-birth">생년월일</label>
          <input
            id="signup-birth"
            className="auth-input"
            type="date"
            value={formData.birth}
            onChange={handleChange("birth")}
          />
          {errors.birth && <p style={{ color: "red", margin: "0" }}>{errors.birth}</p>}

          {/* 이메일 */}
          <label className="auth-label" htmlFor="signup-email">이메일</label>
          <div className="input-with-button">
            <input
              id="signup-email"
              className="auth-input"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange("email")}
              disabled={emailVerify.isVerified}
            />
            <button
              type="button"
              className="verify-button"
              onClick={() => emailVerify.handleSendCode(formData.email)}
              disabled={emailVerify.isVerified}
            >
              {emailVerify.isSent ? "재발송" : "인증하기"}
            </button>
          </div>
          {errors.email && !emailVerify.isSent && (
            <p style={{ color: "red", margin: "0" }}>{errors.email}</p>
          )}

          {emailVerify.isSent && !emailVerify.isVerified && (
            <div className="input-with-button">
              <input
                className="auth-input verify-code-input"
                type="text"
                placeholder="이메일 인증번호 입력"
                value={emailVerify.code}
                onChange={(e) => emailVerify.setCode(e.target.value)}
              />
              <button
                type="button"
                className="verify-button"
                onClick={() => emailVerify.handleVerifyCode(formData.email)}
                disabled={emailVerify.isExpired}
              >
                확인
              </button>
            </div>
          )}
          {emailVerify.isSent && !emailVerify.isVerified && (
            <p style={{ color: emailVerify.isExpired ? "red" : "gray", margin: "0" }}>
              {emailVerify.isExpired ? "인증 시간이 만료되었습니다." : `남은 시간: ${emailVerify.formattedTime}`}
            </p>
          )}
          {emailVerify.error && !emailVerify.isVerified && (
            <p style={{ color: "red", margin: "0" }}>{emailVerify.error}</p>
          )}
          {emailVerify.isVerified && (
            <p style={{ color: "green", margin: "0" }}>이메일 인증이 완료되었습니다.</p>
          )}

          {/* 휴대폰 */}
          <label className="auth-label" htmlFor="signup-phone">휴대폰 번호</label>
          <div className="input-with-button">
            <input
              id="signup-phone"
              className="auth-input"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleChange("phone")}
            />
            <button type="button" className="verify-button">인증하기</button>
          </div>
          {errors.phone && <p style={{ color: "red", margin: "0" }}>{errors.phone}</p>}

          {/* 약관동의 */}
          <div className="terms-section">
            <label className="checkbox-label">
              <input type="checkbox" checked={allChecked} onChange={(e) => handleAllCheck(e.target.checked)} />
              <span>전체 동의</span>
            </label>
            <label className="checkbox-label sub">
              <input type="checkbox" checked={agreements.service} onChange={handleSingleCheck('service')} />
              <span>[필수] 서비스 이용약관 동의</span>
            </label>
            <label className="checkbox-label sub">
              <input type="checkbox" checked={agreements.privacy} onChange={handleSingleCheck('privacy')} />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </label>
            <label className="checkbox-label sub">
              <input type="checkbox" checked={agreements.finance} onChange={handleSingleCheck('finance')} />
              <span>[필수] 전자금융거래 이용약관 동의</span>
            </label>
            <label className="checkbox-label sub">
              <input type="checkbox" checked={agreements.marketing} onChange={handleSingleCheck('marketing')} />
              <span>[선택] 마케팅 정보 수신 동의</span>
            </label>
          </div>
          {errors.terms && <p style={{ color: "red", margin: "0" }}>{errors.terms}</p>}

          <button type="button" className="submit-button" onClick={() => handleSubmit({
            ...formData,
            userId,
            isIdVerified,
            isEmailVerified: emailVerify.isVerified,
            isAllRequiredChecked: isRequiredAgreed,
            marketingAgreed: agreements.marketing,
          })}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;