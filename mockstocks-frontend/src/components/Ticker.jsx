function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {'삼성전자 71,000 ▲1.2%  ·  SK하이닉스 195,000 ▼0.8%  ·  카카오 42,000 ▲2.4%  ·  NAVER 218,000 ▼0.3%  ·  '.repeat(3)}
      </div>
    </div>
  );
}

export default Ticker;