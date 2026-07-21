import { SCOREBOARD_DATA } from '../data/mockData';

function ScoreBoard() {
  return (
    <div className="scoreboard">
      <div className="scoreboard-head">
        <span className="dot" />
        LIVE RANKING
      </div>
      {SCOREBOARD_DATA.map((row) => (
        <div className={`board-row ${row.isYou ? 'you' : ''}`} key={row.rank}>
          <span className="board-rank">{row.rank}</span>
          <span className="board-name">{row.name}</span>
          <span className={`board-pct ${row.up ? 'up' : 'down'}`}>
            {row.up ? '+' : ''}{row.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default ScoreBoard;