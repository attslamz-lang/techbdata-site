import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const sources = [
  ["Сайт", "Посещение сайта", "Человек изучал предложение компании вашей ниши и сравнивал варианты."],
  ["Звонок", "Разговор по телефону", "Потенциальный клиент уже начал диалог с компанией категории."],
  ["Заявка", "Запрос или форма", "Аудитория оставила заявку или другое осмысленное обращение."],
];

const launchSteps = [
  ["Определяем задачу", "Согласовываем нишу, географию и критерии целевого контакта."],
  ["Собираем источники", "Подбираем сайты и номера компаний, которые подходят под задачу."],
  ["Передаём результат", "Отдаём контакты или подключаем первичную квалификацию."],
  ["Улучшаем поток", "Смотрим качество и масштабируем сильные источники."],
];

const managerFields = ["Контакт", "Источник", "Потребность", "Комментарий", "Статус", "Запись разговора"];

const faqs = [
  ["Что именно передаётся отделу продаж?", "В зависимости от формата — контакт с источником и контекстом либо лид после первичной квалификации колл-центром."],
  ["Можно ли обрабатывать контакты самостоятельно?", "Да. Первый формат рассчитан на команду, которая сама связывается с полученной аудиторией."],
  ["Как выбираются источники?", "Сначала фиксируем нишу и критерии, затем команда сопровождения анализирует качество и отключает слабые источники."],
  ["Что происходит при большом объёме?", "Для стандартных пакетов действует цена за контакт, а объём от 50 000 контактов рассчитывается индивидуально."],
];

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero" id="about">
        <div className="hero-atmosphere" aria-hidden="true"><i /><i /><i /><b /><b /><b /></div>
        <div className="hero-arc arc-one" aria-hidden="true" /><div className="hero-arc arc-two" aria-hidden="true" />
        <div className="hero-signal signal-site" aria-hidden="true"><span />сайт</div>
        <div className="hero-signal signal-call" aria-hidden="true"><span />звонок</div>
        <div className="hero-signal signal-form" aria-hidden="true"><span />заявка</div>
        <div className="page-wrap home-hero-inner">
          <p className="home-kicker"><span /> techbdata / целевой спрос</p>
          <h1>Клиенты ваших конкурентов — <em>в вашем отделе продаж</em></h1>
          <p className="home-hero-lead">Пока компании вашей ниши платят за рекламу и привлекают спрос, techbdata находит контакты заинтересованной аудитории. Получайте номера для самостоятельной обработки или готовых к разговору лидов после квалификации колл-центром.</p>
          <div className="home-hero-actions"><a className="home-button home-button-primary" href="#contact">Получить расчёт <span>↗</span></a><a className="home-button-link" href="#mechanics">Как это работает <span>↓</span></a></div>
          <div className="home-trust"><span>Резидент Сколково</span><span>Реестр российского ПО Минцифры</span><span>CRM</span><span>Персональное сопровождение</span></div>
        </div>
        <div className="hero-bottom-note"><span>Найти сформированный спрос</span><span>Передать в работу</span><span>Улучшать источники</span></div>
      </section>

      <section className="home-section contrast-section" id="why">
        <div className="page-wrap split-heading"><div><p className="home-kicker"><span /> не обычная реклама</p><h2>Не покупайте внимание.<br /><em>Получайте повод для разговора.</em></h2></div><p>Реклама оплачивает показы и клики. Холодная база даёт номер без контекста. techbdata помогает отделу продаж работать с аудиторией, которая уже взаимодействовала с предложением вашей категории.</p></div>
        <div className="page-wrap contrast-band"><div><small>Реклама</small><strong>Охват</strong><span>Сначала нужно сформировать интерес</span></div><div><small>Холодная база</small><strong>Контакт</strong><span>Интерес к категории не подтверждён</span></div><div className="contrast-focus"><small>techbdata</small><strong>Контекст</strong><span>Понятно, откуда пришёл интерес и что обсуждать</span></div></div>
      </section>

      <section className="home-section source-section" id="sources">
        <div className="page-wrap"><div className="section-intro"><p className="home-kicker"><span /> откуда появляется спрос</p><h2>Три точки, где начинается <em>будущий разговор.</em></h2><p>Мы собираем не абстрактную аудиторию, а след взаимодействия с компаниями вашей ниши.</p></div><div className="source-rail">{sources.map(([kind, title, text], index) => <article className="source-node" key={kind}><div className="source-node-top"><span className={`source-icon source-icon-${index + 1}`} /> <small>{kind}</small><b>0{index + 1}</b></div><h3>{title}</h3><p>{text}</p><div className="source-route" aria-hidden="true" /></article>)}</div></div>
      </section>

      <section className="home-section mechanics-section" id="mechanics">
        <div className="page-wrap"><div className="section-intro"><p className="home-kicker"><span /> механика продукта</p><h2>От первого сигнала <em>до CRM менеджера.</em></h2></div><div className="mechanics-board"><div className="mechanics-path"><span>сайт</span><i>→</i><span>звонок</span><i>→</i><span>заявка</span><i>→</i><strong>контакт</strong><i>→</i><b>CRM</b></div><div className="mechanics-ui ui-browser"><small>Источник</small><strong>Сайт компании ниши</strong><p>Изучает предложения</p></div><div className="mechanics-ui ui-call"><small>Звонок</small><strong>Задача выяснена</strong><p>Комментарий оператора</p></div><div className="mechanics-ui ui-crm"><small>CRM / карточка</small><strong>Готов к контакту</strong><p>Статус · квалифицирован</p></div></div></div>
      </section>

      <section className="home-section formats-section-new" id="formats"><div className="page-wrap"><div className="section-intro"><p className="home-kicker"><span /> два формата работы</p><h2>Выбираете, кто берёт контакт <em>в работу.</em></h2></div><div className="format-panels-new"><article><small>Формат 01</small><h3>Контакты</h3><p>Контакты передаются вашему отделу продаж для самостоятельной обработки.</p><a href="#tariffs">Посмотреть стоимость <span>↗</span></a></article><article className="format-panel-highlight"><small>Формат 02</small><h3>Квалифицированные лиды</h3><p>Колл-центр связывается с контактом, уточняет задачу и передаёт готовых к разговору лидов.</p><a href="#tariffs">Посмотреть стоимость <span>↗</span></a></article></div></div></section>

      <section className="home-section manager-section"><div className="page-wrap manager-layout"><div className="section-intro"><p className="home-kicker"><span /> для отдела продаж</p><h2>Менеджер получает не номер, а <em>контекст разговора.</em></h2><p>Все важные детали собраны в одной карточке — чтобы быстрее понять задачу и продолжить диалог.</p></div><div className="manager-card"><div className="manager-card-head"><span>КАРТОЧКА КОНТАКТА</span><b>techbdata</b></div>{managerFields.map((field, i) => <div className="manager-row" key={field}><span>{field}</span><strong>{i === 0 ? "Компания / сегмент B2B" : i === 1 ? "Сайт компании ниши" : i === 2 ? "Сравнивает предложения" : i === 3 ? "Готов обсудить задачу" : i === 4 ? "Квалифицирован" : "Доступна запись"}</strong></div>)}</div></div></section>

      <section className="home-section launch-section" id="launch"><div className="page-wrap"><div className="section-intro"><p className="home-kicker"><span /> запуск и сопровождение</p><h2>Запускаем поток, который можно <em>улучшать.</em></h2></div><div className="launch-grid">{launchSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="optimization-note"><strong>Сопровождение после запуска</strong><span>анализируем источники → отключаем слабые → масштабируем сильные</span></div></div></section>

      <section className="home-section audience-section-new"><div className="page-wrap audience-layout"><div className="section-intro"><p className="home-kicker"><span /> кому подходит</p><h2>Когда спрос уже есть, но его нужно <em>забрать в работу.</em></h2></div><div className="audience-list"><p>B2B-компаниям с активным отделом продаж</p><p>Бизнесам с понятными конкурентами</p><p>Нишам, где клиент сравнивает предложения</p><p>Командам, которым нужен дополнительный поток контактов</p></div></div></section>

      <section className="pricing-section" id="tariffs"><div className="page-wrap"><div className="section-intro pricing-intro"><p className="home-kicker"><span /> тарифы</p><h2>Стоимость зависит от формата и <em>объёма пакета.</em></h2><p>Стандартные пакеты — от 1 000 до 10 000 контактов. Для объёма от 50 000 контактов подготовим индивидуальный расчёт.</p></div><div className="pricing-grid"><article className="pricing-panel"><div className="pricing-panel-head"><small>Контакты без обзвона</small><strong>от 40 до 65 ₽ <i>за контакт</i></strong><p>Контакты передаются вашему отделу продаж для самостоятельной обработки</p></div><div className="price-row"><span>1 000 контактов</span><b>65 000 ₽</b><small>65 ₽ / контакт</small></div><div className="price-row"><span>3 000 контактов</span><b>155 000 ₽</b><small>≈ 51,7 ₽ / контакт</small></div><div className="price-row"><span>10 000 контактов</span><b>400 000 ₽</b><small>40 ₽ / контакт</small></div><div className="price-row price-row-last"><span>от 50 000 контактов</span><b>индивидуально</b><small>расчёт под объём</small></div></article><article className="pricing-panel pricing-panel-accent"><div className="pricing-panel-head"><small>Контакты с первичной квалификацией</small><strong>от 75,5 до 110 ₽ <i>за контакт</i></strong><p>Колл-центр связывается с контактом, уточняет задачу и передаёт готовых к разговору лидов</p></div><div className="price-row"><span>1 000 контактов</span><b>110 000 ₽</b><small>110 ₽ / контакт</small></div><div className="price-row"><span>3 000 контактов</span><b>275 000 ₽</b><small>≈ 91,7 ₽ / контакт</small></div><div className="price-row"><span>10 000 контактов</span><b>755 000 ₽</b><small>75,5 ₽ / контакт</small></div><div className="price-row price-row-last"><span>от 50 000 контактов</span><b>индивидуально</b><small>расчёт под объём</small></div></article></div></div></section>

      <section className="home-section trust-section"><div className="page-wrap trust-layout"><div><p className="home-kicker"><span /> доверие и подход</p><h2>Технологичный продукт с понятным <em>процессом работы.</em></h2></div><div className="trust-points"><span>Резидент Сколково</span><span>Продукт в реестре российского ПО Минцифры</span><span>CRM и личный кабинет</span><span>Персональное сопровождение</span></div></div></section>

      <section className="home-section faq-section-new" id="faq"><div className="page-wrap faq-layout"><div className="section-intro"><p className="home-kicker"><span /> ответы</p><h2>Что важно знать <em>до старта.</em></h2></div><div className="faq-list-new">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="final-cta" id="contact"><div className="final-cta-glow" aria-hidden="true" /><div className="page-wrap final-cta-inner"><p className="home-kicker"><span /> следующий шаг</p><h2>Найдём аудиторию, которая уже <em>смотрит в сторону вашей ниши.</em></h2><p>Обсудим задачу, формат работы и объём, который сможет обработать ваш отдел продаж.</p><a className="home-button home-button-primary" href="mailto:hello@techbdata.ru">Получить расчёт <span>↗</span></a></div></section>

      <SiteFooter />
    </main>
  );
}
