import { STEPS } from '../data/mockData';

function StepsSection() {
  return (
    <section className="steps">
      <h2 className="section-title">시작은 3단계면 끝</h2>
      <div className="step-row">
        {STEPS.map((s) => (
          <div className="step-card" key={s.n}>
            <span className="step-num">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StepsSection;