// AuthHeader.jsx — 이제 진짜 짧아짐
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import Nav from '@/components/Nav';
import '@/css/AuthHeader.css';

function AuthHeader() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="topbar">
      <Nav />
      <div className="auth-actions">
        {isLoggedIn ? (
          <>
            <button type="button" className="auth-button account-button">내 계좌</button>
            <button type="button" className="auth-button logout-button" onClick={logout}>로그아웃</button>
          </>
        ) : (
          <Link to="/login" className="auth-button login-button">로그인</Link>
        )}
      </div>
    </div>
  );
}

export default AuthHeader;