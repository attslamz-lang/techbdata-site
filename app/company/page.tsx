import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const principles = [
  ["01", "Разбираться в задаче", "Начинаем не с шаблонного пакета, а с ниши, воронки и целей бизнеса."],
  ["02", "Считать результат", "Строим работу вокруг показателей, которые можно объяснить и проверить."],
  ["03", "Оставаться на связи", "Сопровождаем запуск и используем обратную связь для улучшения сценария."],
];

export default function CompanyPage() {
  return (
    <main className="inner-page">
      <SiteHeader current="company" />
      <section className="inner-hero company-hero section-grid">
        <div className="page-wrap company-hero-layout">
          <div>
            <p className="eyebrow"><span /> О TECHBDATA</p>
            <h1>Технологии, у которых есть <em>деловая цель.</em></h1>
          </div>
          <p className="inner-lead">Страница о компании будет собирать реальные подтверждения: команду, документы, партнёрства и факты. Пока показываем её визуальную роль в структуре сайта.</p>
        </div>
      </section>
      <section className="page-wrap inner-content company-content">
        <p className="page-section-title">ПРИНЦИПЫ РАБОТЫ</p>
        <div className="principle-grid">
          {principles.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="proof-placeholder">
          <span>БЛОК ДОВЕРИЯ / В ПОДГОТОВКЕ</span>
          <strong>Здесь разместим только подтверждённые факты: реестры, партнёрства, цифры и документы.</strong>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
