import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const solutions = [
  ["01", "Лидогенерация", "Настраиваем дополнительный канал привлечения клиентов под вашу нишу и возможности отдела продаж."],
  ["02", "Интеграция", "Продумываем передачу контактов и работу с CRM, чтобы новый поток не терялся на входе."],
  ["03", "Сопровождение", "Помогаем проверять гипотезы и корректировать сценарий по фактической обратной связи."],
];

export default function SolutionsPage() {
  return (
    <main className="inner-page">
      <SiteHeader current="solutions" />
      <section className="inner-hero section-grid">
        <div className="page-wrap">
          <p className="eyebrow"><span /> НАПРАВЛЕНИЯ РАБОТЫ</p>
          <h1>Решения, которые усиливают <em>продажи.</em></h1>
          <p className="inner-lead">Здесь будет подробное описание услуг. В прототипе фиксируем структуру: отдельная задача бизнеса, краткое объяснение и следующий шаг.</p>
        </div>
      </section>
      <section className="page-wrap inner-content">
        <div className="solution-list">
          {solutions.map(([number, title, text]) => (
            <article className="solution-row" key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <a href="/#contact" aria-label={`Обсудить направление ${title}`}>↗</a>
            </article>
          ))}
        </div>
        <aside className="page-aside"><span>НА СЛЕДУЮЩЕМ ЭТАПЕ</span><p>Развернём каждое направление в самостоятельную продающую страницу с конкретной аудиторией, выгодами и примерами.</p></aside>
      </section>
      <SiteFooter />
    </main>
  );
}
