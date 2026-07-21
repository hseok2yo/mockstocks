import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        MOCK<span className="logo-accent">STOCKS</span>
      </Link>
      <div className="nav-right">
        <span className="nav-tag">PAPER TRADING ARENA</span>
        <button className="btn-cta-small">시작하기</button>
      </div>
    </nav>
  );
}

export default Nav;