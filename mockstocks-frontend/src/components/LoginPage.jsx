import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRecaptcha } from "@/hooks/common/useRecaptcha";
import { loginApi } from "@/api/common/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/components/AuthContext';

function LoginPage() {


    // reCAPTCHA 관련 상태와 동작을 커스텀 훅에서 가져옴
    const { showCaptcha, captchaError, verifying, recaptchaRef, handleOpenCaptcha, handleCloseCaptcha, handleCaptchaSubmit, onCaptchaChange, onCaptchaExpired } = useRecaptcha();



    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { login } = useAuth(); // Context의 login 함수

    const handleLogin = async (e) => {
        e.preventDefault(); // form 기본 새로고침 동작 막기
        try {
            const response = await loginApi({ userId, password }); // 이건 API 호출 함수 (기존 그대로)
            const { token } = response;

            login(token); // localStorage 저장 + isLoggedIn 상태 갱신 한번에

            navigate("/");
        } catch (error) {
            console.error("로그인 실패:", error);
            const serverMessage = error.response?.data?.message;
            alert(serverMessage || "로그인에 실패했습니다. 다시 시도해주세요.");

        }
    };



    return (
        <div className="auth-page">
            <div className="auth-card auth-card--login">
                <Link to="/" className="back-button">
                    ← 메인으로
                </Link>

                <h2>로그인</h2>
                <p className="auth-subtitle">아이디와 비밀번호를 입력해주세요.</p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <label className="auth-label" htmlFor="login-id">
                        아이디
                    </label>
                    <input
                        id="login-id"
                        className="auth-input"
                        type="text"
                        placeholder="아이디 입력"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <label className="auth-label" htmlFor="login-password">
                        비밀번호
                    </label>
                    <input
                        id="login-password"
                        className="auth-input"
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="submit-button">
                        로그인
                    </button>
                </form>

                <button type="button" className="auth-link-button" onClick={handleOpenCaptcha}>
                    회원가입
                </button>
            </div>

            {showCaptcha && (
                <div className="captcha-overlay" role="dialog" aria-modal="true" aria-label="캡챠 확인">
                    <div className="captcha-modal">
                        <p className="captcha-title">보안 확인</p>
                        <p className="captcha-subtitle">아래 확인란을 선택하면 회원가입 페이지로 이동합니다.</p>

                        <form className="captcha-form" onSubmit={handleCaptchaSubmit}>
                            <div className="captcha-widget">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={onCaptchaChange}
                                    onExpired={onCaptchaExpired}
                                />
                            </div>

                            <div className="captcha-actions">
                                <button
                                    type="submit"
                                    className="submit-button captcha-submit"
                                    disabled={verifying}
                                >
                                    {verifying ? '확인 중...' : '확인'}
                                </button>
                                <button
                                    type="button"
                                    className="back-button captcha-cancel"
                                    onClick={handleCloseCaptcha}
                                    disabled={verifying}
                                >
                                    취소
                                </button>
                            </div>

                            {captchaError && <p className="captcha-error">{captchaError}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
