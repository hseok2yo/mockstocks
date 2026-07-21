import ScoreBoard from './ScoreBoard';

function Hero() {
  return (
    <header className="hero">
      <div className="hero-left">
        <p className="eyebrow">AI ANALYST vs HUMAN INSTINCT</p>
        <h1 className="headline">
          당신의 감각,
          <br />
          <span className="accent-gold">AI</span>의 알고리즘.
        </h1>
        <p className="sub">
          가상의 시드로 실전처럼 투자하고, 서로 다른 투자 스타일을 가진
          AI 애널리스트들과 수익률로 진검승부.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">무료로 시작하기</button>
          <button className="btn-ghost">랭킹 보기 →</button>
        </div>
      </div>

      <ScoreBoard />
    </header>
  );
}

export default Hero;