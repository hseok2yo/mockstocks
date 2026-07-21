import { Link } from 'react-router-dom';

function LoginPage() {
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

                <Link to="/signup" className="auth-link-button">
                    회원가입
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;