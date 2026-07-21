export const PERSONAS = [
  { id: 'value', name: '벤저민', style: '가치투자', tag: 'VALUE', desc: 'PER·PBR 낮은 저평가주만 노림. 느리지만 우직함.' },
  { id: 'growth', name: '캐시', style: '성장투자', tag: 'GROWTH', desc: '실적 성장률과 미래 스토리에 베팅. 고위험 고수익.' },
  { id: 'momentum', name: '제시', style: '모멘텀', tag: 'MOMENTUM', desc: '추세 추종. 오르는 종목을 더 산다.' },
  { id: 'contrarian', name: '리버스', style: '역발상', tag: 'CONTRARIAN', desc: '남들이 팔 때 산다. 공포에 사고 탐욕에 판다.' },
];

export const STEPS = [
  { n: '01', title: '가상 시드 1,000만원 지급', desc: '회원가입하면 즉시 모의투자 계좌 생성' },
  { n: '02', title: '실시간 시세로 매매', desc: '진짜 시장 데이터 기반, 리스크는 0원' },
  { n: '03', title: 'AI 4인과 수익률 대결', desc: '매일 자동매매하는 AI들과 랭킹 경쟁' },
];

export const POPULAR_STOCKS = [
  { rank: 1, name: '삼성전자', code: '005930', price: 71000, pct: 1.2, up: true },
  { rank: 2, name: 'SK하이닉스', code: '000660', price: 195000, pct: -0.8, up: false },
  { rank: 3, name: '카카오', code: '035720', price: 42000, pct: 2.4, up: true },
  { rank: 4, name: 'NAVER', code: '035420', price: 218000, pct: -0.3, up: false },
  { rank: 5, name: 'LG에너지솔루션', code: '373220', price: 412000, pct: 3.1, up: true },
  { rank: 6, name: '현대차', code: '005380', price: 251000, pct: 0.6, up: true },
  { rank: 7, name: '기아', code: '000270', price: 118500, pct: -1.4, up: false },
  { rank: 8, name: 'POSCO홀딩스', code: '005490', price: 389000, pct: 1.8, up: true },
  { rank: 9, name: '삼성바이오로직스', code: '207940', price: 845000, pct: -0.5, up: false },
  { rank: 10, name: '셀트리온', code: '068270', price: 187500, pct: 4.2, up: true },
];

export const SCOREBOARD_DATA = [
  { rank: 1, name: '나 (HUMAN)', pct: 18.4, up: true, isYou: true },
  { rank: 2, name: '제시 · MOMENTUM', pct: 14.1, up: true },
  { rank: 3, name: '캐시 · GROWTH', pct: -3.2, up: false },
  { rank: 4, name: '벤저민 · VALUE', pct: 5.7, up: true },
  { rank: 5, name: '리버스 · CONTRARIAN', pct: -1.0, up: false },
];