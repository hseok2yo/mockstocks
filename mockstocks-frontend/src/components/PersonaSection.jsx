import { PERSONAS } from '@/data/mockData';

function PersonaSection() {
  return (
    <section className="personas">
      <h2 className="section-title">당신과 맞붙을 AI 4인</h2>
      <div className="persona-grid">
        {PERSONAS.map((p) => (
          <div className="persona-card" key={p.id}>
            <span className="persona-tag">{p.tag}</span>
            <h3>{p.name}</h3>
            <p className="persona-style">{p.style}</p>
            <p className="persona-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PersonaSection;