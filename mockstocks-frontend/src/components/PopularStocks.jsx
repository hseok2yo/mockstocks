import { POPULAR_STOCKS } from '../data/mockData';

function PopularStocks() {
  return (
    <section className="popular">
      <h2 className="section-title">지금 뜨는 종목</h2>

      <div className="popular-table">
        <div className="popular-head">
          <span>순위</span>
          <span>종목명</span>
          <span className="align-right">현재가</span>
          <span className="align-right">등락률</span>
        </div>

        {POPULAR_STOCKS.map((s) => (
          <div className="popular-tr" key={s.code}>
            <span className="popular-rank">{s.rank}</span>
            <div className="popular-name-cell">
              <span className="popular-icon">{s.name[0]}</span>
              <div>
                <div className="popular-name">{s.name}</div>
                <div className="popular-code">{s.code}</div>
              </div>
            </div>
            <span className="popular-price align-right">
              {s.price.toLocaleString()}
              <span className="won">원</span>
            </span>
            <span className={`popular-pct-pill align-right ${s.up ? 'up' : 'down'}`}>
              {s.up ? '▲' : '▼'} {Math.abs(s.pct)}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularStocks;