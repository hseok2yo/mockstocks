import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRecaptcha } from "@/hooks/common/useRecaptcha";

function LoginPage() {
    // reCAPTCHA 관련 상태와 동작을 커스텀 훅에서 가져옴
    const { showCaptcha, captchaError, verifying, recaptchaRef, handleOpenCaptcha, handleCloseCaptcha, handleCaptchaSubmit, onCaptchaChange, onCaptchaExpired } = useRecaptcha();



    return (
        <div className="auth-page">
            <div className="auth-card auth-card--login">
                <Link to="/" className="back-button">
                    ← 메인으로
                </Link>

                <h2>로그인</h2>
                <p className="auth-subtitle">이메일과 비밀번호를 입력해주세요.</p>

                <form className="auth-form">
                    <label className="auth-label" htmlFor="login-email">
                        이메일
                    </label>
                    <input
                        id="login-email"
                        className="auth-input"
                        type="email"
                        placeholder="example@email.com"
                    />

                    <label className="auth-label" htmlFor="login-password">
                        비밀번호
                    </label>
                    <input
                        id="login-password"
                        className="auth-input"
                        type="password"
                        placeholder="비밀번호 입력"
                    />

                    <button type="button" className="submit-button">
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
