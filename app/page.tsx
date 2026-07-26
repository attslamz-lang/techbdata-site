import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const sources = [
  { number: "01", kind: "Сайт", title: "Посетили сайт компании ниши", text: "Человек уже изучал предложения и сравнивал варианты в вашей категории." },
  { number: "02", kind: "Звонок", title: "Позвонили по номеру компании", text: "Фиксируем интерес там, где потенциальный клиент уже начал разговор." },
  { number: "03", kind: "Заявка", title: "Оставили заявку или запрос", text: "Находим аудиторию, которая уже взаимодействовала с предложением вашей ниши." },
];

const comparison = [
  ["Реклама", "Оплата за показы и клики. Спрос ещё нужно сформировать и дождаться."],
  ["Холодная база", "Контакт есть, но интерес к вашей категории не подтверждён."],
  ["techbdata", "Контакт уже проявил интерес к нише — менеджер получает контекст для разговора."],
];

const faq = [
  ["Это готовые клиенты или просто номера?", "Есть два формата: контакты для самостоятельной обработки и лиды после квалификации колл-центром. Формат выбираете под работу вашего отдела продаж."],
  ["Что получает менеджер вместе с контактом?", "Номер, источник, потребность, комментарий, текущий статус и, при квалификации, запись разговора."],
  ["Можно ли начать с небольшой задачи?", "Да. Сначала согласовываем нишу, географию, критерии контакта и объём, который сможет обработать ваша команда."],
  ["Как вы понимаете, какие источники работают?", "Команда сопровождения анализирует качество контактов, отключает слабые источники и масштабирует те, которые дают целевую аудиторию."],
];

const workflow = [
  ["01", "Определяем аудиторию", "Согласовываем нишу, географию и критерии целевого контакта."],
  ["02", "Подбираем источники", "Формируем список сайтов компаний и номеров, которые подходят под задачу."],
  ["03", "Получаем и квалифицируем", "Передаём контакты или подключаем колл-центр для уточнения задачи."],
  ["04", "Передаём в CRM", "Фиксируем результат и улучшаем источники по фактическому качеству."],
];

const audiences = [
  "B2B-компаниям с активным отделом продаж",
  "Компаниям с понятными конкурентами и целевой аудиторией",
  "Бизнесам, где клиент сравнивает несколько предложений",
  "Отделам продаж, которым нужен дополнительный поток контактов",
];

const cases = ["B2B-услуги", "Недвижимость", "Медицинские услуги"];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero section-grid" id="about">
        <div className="page-wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span /> КЛИЕНТЫ С УЖЕ СФОРМИРОВАННЫМ СПРОСОМ</p>
            <h1>Клиенты ваших конкурентов — <em>в вашем отделе продаж</em></h1>
            <p className="hero-description">
              Пока компании вашей ниши платят за рекламу и привлекают спрос, techbdata находит контакты заинтересованной аудитории. Получайте номера для самостоятельной обработки или готовых к разговору лидов после квалификации колл-центром.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Получить расчёт <span>↗</span></a>
              <a className="text-link" href="#how">Как это работает <span>↓</span></a>
            </div>
            <div className="trust-row" aria-label="Доверие к techbdata">
              <span>Резидент Сколково</span>
              <span>Реестр российского ПО Минцифры</span>
              <span>CRM</span>
              <span>Персональное сопровождение</span>
            </div>
          </div>

          <div className="signal-stage crm-route" aria-label="Демонстрация маршрута контакта в CRM">
            <div className="stage-topline"><span className="status-dot" /><span>CONTACT ROUTE / DEMO</span><span>CRM READY</span></div>
            <div className="stage-orbit orbit-one" />
            <div className="stage-orbit orbit-two" />
            <div className="crm-route-line route-one" />
            <div className="crm-route-line route-two" />
            <div className="route-node route-source"><i /><span>Источник</span><b>Сайт компании ниши</b></div>
            <div className="route-node route-qualify"><i /><span>Квалификация</span><b>Задача выяснена</b></div>
            <div className="route-node route-crm"><i /><span>CRM</span><b>Готов к контакту</b></div>
            <div className="crm-note"><small>ДЕМО-КОНТАКТ</small><strong>Компания / сегмент B2B</strong><p>Интерес: сравнивает предложения</p></div>
            <div className="stage-rail"><span>Нейтральные демонстрационные данные</span><b>techbdata</b></div>
          </div>
        </div>
      </section>

      <section className="section page-wrap sources-section" id="sources">
        <div className="section-heading compact-heading">
          <p className="eyebrow"><span /> ОТКУДА БЕРУТСЯ КОНТАКТЫ</p>
          <h2>Работаем с людьми, которые уже <em>проявили интерес</em> к вашей нише.</h2>
        </div>
        <div className="feature-grid source-grid">
          {sources.map((source) => (
            <article className="feature-card source-card" key={source.number}>
              <span className="feature-number">{source.number}</span>
              <div><span className="source-kind">{source.kind}</span><h3>{source.title}</h3><p>{source.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-section section page-wrap">
        <div className="section-heading compact-heading">
          <p className="eyebrow"><span /> ПОЧЕМУ НЕ ПРОСТО РЕКЛАМА</p>
          <h2>Платите не за шум вокруг бренда, а за <em>следующий разговор.</em></h2>
        </div>
        <div className="comparison-grid">
          {comparison.map(([title, text], index) => <article key={title} className={index === 2 ? "comparison-card comparison-card-accent" : "comparison-card"}><span>{title}</span><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section page-wrap formats-section" id="solutions">
        <div className="section-heading compact-heading">
          <p className="eyebrow"><span /> ДВА ФОРМАТА РАБОТЫ</p>
          <h2>Выбираете, кто берёт контакт <em>в работу.</em></h2>
        </div>
        <div className="format-grid">
          <article className="format-card"><span className="format-index">КОНТАКТЫ</span><h3>Контакты для вашего отдела продаж</h3><p>Получаете номер и данные об источнике. Ваши менеджеры самостоятельно связываются с потенциальными клиентами.</p><a href="#contact">Обсудить формат <span>↗</span></a></article>
          <article className="format-card format-card-accent"><span className="format-index">КВАЛИФИЦИРОВАННЫЕ ЛИДЫ</span><h3>Клиенты, готовые к разговору</h3><p>Команда techbdata связывается с контактом, выясняет задачу и передаёт менеджеру человека, готового продолжить обсуждение.</p><a href="#contact">Обсудить формат <span>↗</span></a></article>
        </div>
        <p className="format-note">Вы получаете не просто номер, а клиента, у которого уже выяснены задачи и который готов продолжить обсуждение с вашей компанией.</p>
      </section>

      <section className="workflow-section" id="how">
        <div className="page-wrap">
          <div className="section-heading inverted-heading"><p className="eyebrow"><span /> КАК РАБОТАЕТ ПРОЕКТ</p><h2>От критериев аудитории <em>до передачи результата.</em></h2></div>
          <div className="workflow-grid workflow-grid-four">
            {workflow.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section page-wrap support-section">
        <div className="support-copy"><p className="eyebrow"><span /> СОПРОВОЖДЕНИЕ И ОПТИМИЗАЦИЯ</p><h2>Источники не остаются <em>без контроля.</em></h2><p>Команда сопровождения подбирает сайты и номера, анализирует качество контактов, отключает слабые источники и масштабирует те, которые дают целевых клиентов. За проектом закрепляется аккаунт-менеджер.</p><div className="cycle-line"><span>подбор</span><i>→</i><span>запуск</span><i>→</i><span>анализ</span><i>→</i><span>отключение слабых</span><i>→</i><span>масштабирование сильных</span></div></div>
        <div className="crm-demo"><div className="crm-demo-top"><span>CRM / DEMO RECORD</span><b>SYNCED</b></div><div className="crm-record"><span>Контакт</span><strong>Компания / сегмент B2B</strong></div><div className="crm-record"><span>Источник</span><strong>Сайт компании ниши</strong></div><div className="crm-record"><span>Статус</span><strong className="crm-status">Квалифицирован</strong></div><div className="crm-record"><span>Комментарий оператора</span><strong>Сравнивает предложения, готов обсудить</strong></div><div className="crm-record"><span>Критерии</span><strong>Задача выяснена · запись разговора</strong></div></div>
      </section>

      <section className="section page-wrap audience-section">
        <div className="section-heading compact-heading"><p className="eyebrow"><span /> КОМУ ПОДХОДИТ</p><h2>Когда дополнительный поток контактов <em>действительно полезен.</em></h2></div>
        <div className="audience-grid">{audiences.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div>
      </section>

      <section className="case-preview section-grid" id="cases">
        <div className="page-wrap"><div className="section-heading case-heading"><div><p className="eyebrow"><span /> НАПРАВЛЕНИЯ</p><h2>Примеры ниш, где работает <em>модель techbdata.</em></h2></div><Link href="/cases" className="button button-outline">Больше кейсов <span>↗</span></Link></div><div className="case-grid">{cases.map((title, index) => <article className="case-card" key={title}><div className="case-image-placeholder"><span>INDUSTRY / 0{index + 1}</span><i /></div><p className="case-status">НАПРАВЛЕНИЕ</p><h3>{title}</h3><p>Отдельный сценарий подбора источников и передачи контактов для отдела продаж.</p><Link href="/cases" className="card-link">Подробнее о направлении <span>→</span></Link></article>)}</div></div>
      </section>

      <section className="tariff-section" id="tariffs">
        <div className="page-wrap"><div className="section-heading tariff-heading"><p className="eyebrow"><span /> ФОРМАТЫ И СТОИМОСТЬ</p><h2>Понятные условия <em>без лишних пакетов.</em></h2><p>Выбираете вариант обработки под ресурс и задачи вашего отдела продаж.</p></div><div className="tariff-grid"><article className="tariff-card"><span className="tariff-marker">ФОРМАТ 01</span><h3>Контакты</h3><p className="tariff-caption">Для самостоятельной обработки</p><div className="tariff-divider" /><p className="tariff-detail">Номера и данные об источнике для вашего отдела продаж.</p><a href="#contact" className="tariff-link">Цена по запросу <span>↗</span></a></article><article className="tariff-card tariff-card-accent"><span className="tariff-marker">ФОРМАТ 02</span><h3>1000 контактов</h3><p className="tariff-caption">С обработкой колл-центром</p><div className="tariff-divider" /><p className="tariff-detail">Квалификация задач и передача готовых к обсуждению клиентов в CRM.</p><a href="#contact" className="tariff-link">110 000 рублей <span>↗</span></a></article></div></div>
      </section>

      <section className="faq-section section page-wrap" id="faq">
        <div className="section-heading compact-heading"><p className="eyebrow"><span /> ЧАСТЫЕ ВОПРОСЫ</p><h2>Коротко о том, что важно <em>до запуска.</em></h2></div>
        <div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="contact-section" id="contact"><div className="page-wrap contact-layout"><div><p className="eyebrow"><span /> СЛЕДУЮЩИЙ ШАГ</p><h2>Оценим потенциал вашей ниши и <em>предложим сценарий запуска.</em></h2><p className="contact-lead">Обсудим целевую аудиторию, подходящие источники и объём, который сможет обработать ваш отдел продаж.</p></div><div className="contact-panel"><p>ОБСУДИТЬ ЗАДАЧУ</p><div className="fake-input">Ваше имя</div><div className="fake-input">Телефон для связи</div><button type="button" className="button button-primary">Получить расчёт <span>↗</span></button><small>Форма демонстрационная. Механику отправки подключим отдельно.</small></div></div></section>

      <SiteFooter />
    </main>
  );
}
