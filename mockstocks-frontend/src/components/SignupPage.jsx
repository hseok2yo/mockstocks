import '../css/AuthHeader.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateId } from "../utils/validation";
import { useSignupForm, useTermsAgreement } from "../hooks/signupPage/useSignupForm";


{/* */ }
function SignupPage() {

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    finance: false,
    marketing: false,
  });

  const [showEmailCode, setShowEmailCode] = useState(false);

  {/* 회원가입 아이디 중복체크 */ }
  const { userId, handleUserIdChange, idError, isIdVerified, handleCheckId } = useSignupForm();
  {/* 약관동의 상태 관리 */ }
  const { agreements, allChecked, handleAllCheck, handleSingleCheck } = useTermsAgreement();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/login" className="back-button">
          ← 로그인으로 돌아가기
        </Link>

        <h2>회원가입</h2>
        <p className="auth-subtitle">회원 정보를 입력해주세요.</p>

        <form className="auth-form">
          <label className="auth-label" htmlFor="signup-id">
            아이디
          </label>

          <div className="input-with-button">
            <input
              id="signup-id"
              className="auth-input"
              type="text"
              placeholder="아이디 입력"
              value={userId}
              onChange={(e) => handleUserIdChange(e.target.value)}
            />
            <button
              type="button"
              className="verify-button"
              onClick={handleCheckId}
              disabled={isIdVerified} // 확인 완료되면 버튼 비활성화
            >
              중복확인
            </button>
          </div>

          {idError && (
            <p style={{ color: isIdVerified ? "green" : "red", margin: "0" }}>
              {idError}
            </p>
          )}

          <label className="auth-label" htmlFor="signup-nickname">
            닉네임
          </label>
          <input
            id="signup-nickname"
            className="auth-input"
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-password">
            비밀번호
          </label>
          <input
            id="signup-password"
            className="auth-input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-password-check">
            비밀번호 확인
          </label>
          <input
            id="signup-password-check"
            className="auth-input"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-name">
            이름
          </label>
          <input
            id="signup-name"
            className="auth-input"
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-birth">
            생년월일
          </label>
          <input
            id="signup-birth"
            className="auth-input"
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-email">
            이메일
          </label>
          <div className="input-with-button">
            <input
              id="signup-email"
              className="auth-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="verify-button"

            >
              인증하기
            </button>
          </div>


          <input
            className="auth-input verify-code-input"
            type="text"
            placeholder="이메일 인증번호 입력"
          />


          <label className="auth-label" htmlFor="signup-phone">
            휴대폰 번호
          </label>
          <div className="input-with-button">
            <input
              id="signup-phone"
              className="auth-input"
              type="tel"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type="button"
              className="verify-button"

            >
              인증하기
            </button>
          </div>



          <div className="terms-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => handleAllCheck(e.target.checked)}
              />
              <span>전체 동의</span>
            </label>

            <label className="checkbox-label sub">
              <input
                type="checkbox"
                checked={agreements.service}
                onChange={handleSingleCheck('service')}
              />
              <span>[필수] 서비스 이용약관 동의</span>
            </label>

            <label className="checkbox-label sub">
              <input
                type="checkbox"
                checked={agreements.privacy}
                onChange={handleSingleCheck('privacy')}
              />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </label>

            <label className="checkbox-label sub">
              <input
                type="checkbox"
                checked={agreements.finance}
                onChange={handleSingleCheck('finance')}
              />
              <span>[필수] 전자금융거래 이용약관 동의</span>
            </label>

            <label className="checkbox-label sub">
              <input
                type="checkbox"
                checked={agreements.marketing}
                onChange={handleSingleCheck('marketing')}
              />
              <span>[선택] 마케팅 정보 수신 동의</span>
            </label>
          </div>

          <button type="button" className="submit-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;