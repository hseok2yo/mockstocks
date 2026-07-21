import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import '@/css/AuthHeader.css';

function AuthHeader() {
  return (
    <div className="topbar">
      <Nav />

      <div className="auth-actions">
        <Link to="/login" className="auth-button login-button">
          로그인
        </Link>

        <button type="button" className="auth-button account-button">
          내 계좌
        </button>

        <button type="button" className="auth-button logout-button">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default AuthHeader;