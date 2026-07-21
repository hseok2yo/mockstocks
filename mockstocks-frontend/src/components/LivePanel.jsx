import { useState } from 'react';

function LivePanel() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/stocks`)
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('에러:', err);
        setLoading(false);
      });
  };

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>실시간 시세</h2>
        <button className="fetch-btn" onClick={fetchStocks} disabled={loading}>
          {loading ? '불러오는 중...' : '주식 데이터 불러오기'}
        </button>
      </div>

      {stocks.length === 0 ? (
        <div className="empty">버튼을 눌러 종목 데이터를 불러오세요.</div>
      ) : (
        <ul className="stock-list">
          {stocks.map((stock, i) => (
            <li key={stock.code} className="stock-row" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="stock-name">{stock.name}</span>
              <span className="stock-code">{stock.code}</span>
              <span className="stock-price">
                {stock.price.toLocaleString()}
                <span className="won">원</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default LivePanel;
