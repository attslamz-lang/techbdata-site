import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const caseThemes = [
  "Промышленное оборудование",
  "Финансовые услуги",
  "Строительство и ремонт",
  "Автомобильный бизнес",
  "Образовательные продукты",
  "B2B-сервисы",
];

export default function CasesPage() {
  return (
    <main className="cases-page">
      <SiteHeader current="cases" />
      <section className="cases-hero section-grid">
        <div className="page-wrap cases-hero-layout">
          <div>
            <p className="eyebrow"><span /> РАЗДЕЛ В РАЗРАБОТКЕ</p>
            <h1>Кейсы, в которых <em>важен результат.</em></h1>
            <p>Реальные истории появятся здесь после того, как вы передадите материалы. Мы оформим каждый кейс одинаково ясно: задача, сценарий работы, цифры и вывод.</p>
          </div>
          <div className="case-index"><span>CASE INDEX</span><strong>00 / 06</strong></div>
        </div>
      </section>

      <section className="case-list-section page-wrap">
        <div className="case-list">
          {caseThemes.map((theme, index) => (
            <article className="future-case" key={theme}>
              <span className="case-label">CASE / {String(index + 1).padStart(2, "0")} — СКОРО</span>
              <h2>{theme}</h2>
              <p>Место для будущего кейса. После согласования добавим отрасль, исходную задачу, решение и результат с подтверждёнными метриками.</p>
            </article>
          ))}
        </div>
        <p className="case-footer-note"><b>Как будет выглядеть готовый кейс:</b> короткая вводная → задача бизнеса → что сделали → измеримый результат → комментарий клиента. Такая структура помогает продавать, а не просто «показывать портфолио».</p>
        <Link href="/#tariffs" className="button button-primary">Посмотреть тарифы <span>↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
