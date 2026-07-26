import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const launchSteps = [
  ["Определяем задачу", "Согласовываем нишу, географию и критерии целевого контакта."],
  ["Подбираем источники", "Работаем с вашими списками либо формируем подходящий набор сайтов и номеров."],
  ["Настраиваем передачу", "Выбираем самостоятельную обработку или первичную квалификацию колл-центром."],
  ["Запускаем кабинет", "Контакты и результаты обработки поступают в единую систему."],
];

const managerFields = [
  ["Контакт", "Компания, сегмент B2B"],
  ["Источник", "Сайт компании ниши"],
  ["Потребность", "Сравнивает предложения"],
  ["Комментарий", "Готов обсудить задачу"],
  ["Статус", "Квалифицирован"],
  ["Запись разговора", "Доступна запись"],
];

const faqs = [
  ["Что именно передаётся отделу продаж?", "В зависимости от формата — контакт с источником и информацией об интересе либо лид после первичной квалификации колл-центром."],
  ["Можно ли обрабатывать контакты самостоятельно?", "Да. Первый формат рассчитан на отдел продаж, который самостоятельно связывается с полученной аудиторией."],
  ["Как выбираются источники?", "Вы можете предоставить свои списки сайтов и номеров либо поручить подбор команде techbdata."],
  ["Что происходит при большом объёме?", "Для стандартных пакетов действует указанная цена за контакт, а объём от 50 000 контактов рассчитывается индивидуально."],
];

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero" id="about">
        <div className="hero-gradient-layers" aria-hidden="true">
          <i className="gradient-layer gradient-layer-a" />
          <i className="gradient-layer gradient-layer-b" />
          <i className="gradient-layer gradient-layer-c" />
          <i className="gradient-layer gradient-layer-d" />
          <span className="hero-light-pass" />
          <span className="hero-grain" />
        </div>
        <div className="page-wrap home-hero-inner">
          <h1 aria-label="Клиенты ваших конкурентов — в вашем отделе продаж">
            <span className="hero-line hero-line-primary">Клиенты ваших <strong>конкурентов</strong></span>
            <span className="hero-separator" aria-hidden="true"> — </span>
            <span className="hero-line hero-line-secondary"><span>в</span>{" "}<span>вашем</span>{" "}<span>отделе</span>{" "}<span>продаж</span></span>
          </h1>
          <p className="home-hero-lead">Пока компании вашей ниши платят за рекламу и привлекают спрос, techbdata находит контакты заинтересованной аудитории. Получайте номера для самостоятельной обработки или готовых к разговору лидов после квалификации колл-центром.</p>
          <div className="home-hero-actions">
            <a className="home-button home-button-primary" href="#contact"><span>Получить расчёт</span><b aria-hidden="true">↗</b></a>
            <a className="home-button-link" href="#mechanics">Как это работает <span aria-hidden="true">↓</span></a>
          </div>
          <div className="home-trust" aria-label="Подтверждения"><span>Резидент «Сколково»</span><span>Продукт включён в реестр российского ПО Минцифры</span></div>
        </div>
      </section>

      <section className="home-section audience-capture-section" id="why">
        <div className="page-wrap split-heading">
          <div><p className="home-kicker"><span /> сформированный спрос</p><h2>Конкуренты уже привлекли аудиторию. <em>Получите её контакты.</em></h2></div>
          <p>Вы сами определяете целевую аудиторию и источники. Мы можем работать по вашим спискам сайтов и номеров либо самостоятельно подобрать компании, чья аудитория соответствует вашим критериям.</p>
        </div>
        <div className="page-wrap audience-flow-visual" aria-label="Путь контакта от рекламы компании ниши до отдела продаж">
          <div className="flow-interface flow-ad"><small>Компания ниши</small><strong>Рекламное предложение</strong><span className="flow-ad-preview"><i /><i /><i /></span></div>
          <div className="flow-interface flow-action"><small>Действие аудитории</small><strong>Изучает предложение</strong><span>повторный визит · звонок · обращение</span></div>
          <div className="flow-interface flow-contact"><small>techbdata</small><strong>Контакт сформирован</strong><span>источник и интерес зафиксированы</span></div>
          <div className="flow-interface flow-sales"><small>Отдел продаж</small><strong>Карточка готова к работе</strong><span>контакт · источник · комментарий</span></div>
          <div className="flow-progress" aria-hidden="true"><i /></div>
        </div>
        <p className="page-wrap contact-principle">Платите за конкретные контакты, а не за показы и переходы.</p>
      </section>

      <section className="home-section source-section" id="sources">
        <div className="page-wrap">
          <div className="section-intro"><p className="home-kicker"><span /> источники контактов</p><h2>Передаём контакты людей, которые уже взаимодействовали с <em>компаниями вашей ниши.</em></h2></div>
          <div className="source-scenes">
            <article className="source-scene browser-scene">
              <h3>Посещали сайты ваших конкурентов</h3>
              <div className="mini-browser" aria-label="Демонстрация посещения сайта">
                <div className="browser-bar"><span /><span /><span /><b>company-site.ru</b></div>
                <div className="browser-body"><small>Сайт компании</small><strong>Раздел «Услуги»</strong><div className="browser-nav"><i>Главная</i><i className="visited-section">Услуги</i><i>О компании</i></div><div className="visit-log"><span>Повторный визит</span><b>Источник зафиксирован</b></div></div>
              </div>
              <div className="scene-output"><span>Контакт создан</span><b>в систему</b></div>
            </article>

            <article className="source-scene call-scene">
              <h3>Звонили по номерам ваших конкурентов</h3>
              <div className="call-interface" aria-label="Демонстрация данных звонка">
                <div className="call-head"><span className="call-avatar">☎</span><div><small>Входящее действие</small><strong>+7 916 *** 42 18</strong></div><b>Москва</b></div>
                <dl><div><dt>Интерес</dt><dd>Внедрение CRM для отдела продаж</dd></div><div><dt>Сотрудники</dt><dd>20–30 менеджеров</dd></div><div><dt>Следующий шаг</dt><dd>Готов обсудить демонстрацию на следующей неделе</dd></div></dl>
              </div>
              <div className="scene-output"><span>Детали раскрыты</span><b>в систему</b></div>
            </article>

            <article className="source-scene inquiry-scene">
              <h3>Получали сообщения или взаимодействовали с предложениями ваших конкурентов</h3>
              <div className="inquiry-interface" aria-label="Обезличенная демонстрационная карточка обращения">
                <div className="inquiry-head"><span>А</span><div><small>Обращение</small><strong>Алексей · +7 977 *** 19 01</strong></div></div>
                <p>Промышленная вентиляция для складского объекта</p>
                <ul><li>Площадь около 2 500 м²</li><li>Сравнивает несколько подрядчиков</li><li>Ожидает предварительный расчёт</li><li>Готов принять звонок завтра после 14:00</li></ul>
              </div>
              <div className="scene-output"><span>Карточка заполнена</span><b>в систему</b></div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section mechanics-section" id="mechanics">
        <div className="page-wrap">
          <div className="section-intro"><p className="home-kicker"><span /> механика продукта</p><h2>От интереса к контакту <em>в вашем отделе продаж.</em></h2></div>
          <div className="product-process" aria-label="Последовательность обработки контакта">
            <div className="process-track" aria-hidden="true"><i /></div>
            <article className="process-step process-select"><small>Выбрать источники</small><strong>Сайты и номера</strong><div className="source-check"><span className="checked">Сайт компании ниши</span><span className="checked">Номер отдела продаж</span></div></article>
            <article className="process-step process-receive"><small>Получить контакты</small><strong>Действие зафиксировано</strong><div className="created-contact"><span>+7 9** *** 42 18</span><b>Источник добавлен</b></div></article>
            <article className="process-step process-route"><small>Обработать самостоятельно или квалифицировать</small><strong>Выбран маршрут</strong><div className="route-options"><span>Отдел продаж</span><span className="route-active">Колл-центр</span></div><div className="qualification-data"><i>Статус звонка: состоялся</i><i>Критерии: соответствуют</i><i>Комментарий оператора</i><i>Запись разговора</i></div></article>
            <article className="process-step process-crm"><small>Передать результат в CRM</small><strong>Карточка готова</strong><div className="crm-result"><span>Квалифицирован</span><b>Контакт · источник · запись</b></div></article>
            <div className="process-contact" aria-hidden="true"><span />контакт</div>
          </div>
        </div>
      </section>

      <section className="home-section formats-section-new" id="formats">
        <div className="page-wrap">
          <div className="section-intro"><p className="home-kicker"><span /> два формата работы</p><h2>Выберите формат, который подходит <em>вашему отделу продаж.</em></h2></div>
          <div className="format-panels-new">
            <article><small>Самостоятельная обработка</small><h3>Контакты для самостоятельной обработки</h3><p>Получаете контакты потенциальных клиентов и информацию об источнике интереса. Ваши менеджеры самостоятельно связываются с ними и ведут дальнейшую коммуникацию.</p><strong className="format-result">Контакт + источник интереса</strong><a href="#tariffs">Посмотреть стоимость <span>↗</span></a></article>
            <article className="format-panel-highlight"><small>Первичная квалификация</small><h3>Квалифицированные лиды</h3><p>Мы связываемся с контактами и проверяем их по согласованным критериям целевой аудитории. Уточняем актуальность задачи, основные параметры запроса и готовность продолжить обсуждение. Ваш менеджер получает контакт, комментарий оператора и запись разговора.</p><strong className="format-result">Контакт + комментарий + запись</strong><a href="#tariffs">Посмотреть стоимость <span>↗</span></a></article>
          </div>
        </div>
      </section>

      <section className="home-section manager-section">
        <div className="page-wrap manager-layout">
          <div className="section-intro"><p className="home-kicker"><span /> карточка контакта</p><h2>Менеджер получает не номер, а <em>контекст разговора.</em></h2><p>Все важные детали собраны в одной карточке — чтобы быстрее понять задачу и продолжить диалог.</p></div>
          <div className="manager-card"><div className="manager-card-head"><span>Карточка контакта</span><b>techbdata</b></div>{managerFields.map(([field, value]) => <div className="manager-row" key={field}><span>{field}</span><strong>{value}</strong></div>)}</div>
        </div>
      </section>

      <section className="home-section launch-section" id="launch">
        <div className="page-wrap"><div className="section-intro"><p className="home-kicker"><span /> запуск проекта</p><h2>От критериев аудитории до <em>рабочего кабинета.</em></h2></div><div className="launch-grid">{launchSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="home-section optimization-section">
        <div className="page-wrap optimization-layout">
          <div className="section-intro"><p className="home-kicker"><span /> сопровождение и оптимизация</p><h2>Над вашим кабинетом работает <em>команда специалистов.</em></h2><p>Команда techbdata подбирает и проверяет источники, анализирует качество поступающих контактов, отключает слабые направления и увеличивает объём по тем, которые приводят целевую аудиторию.</p></div>
          <div className="optimization-console" aria-label="Демонстрация работы команды с источниками">
            <div className="optimization-row source-good"><span>Источник A</span><strong>Высокая доля целевых контактов</strong><b>Масштабируем</b></div>
            <div className="optimization-row source-weak"><span>Источник B</span><strong>Низкое качество</strong><b>Корректируем или отключаем</b></div>
            <div className="optimization-row source-test"><span>Новый источник</span><strong>Первичная выборка</strong><b>Тестируем</b></div>
            <div className="optimization-result"><span>Результат анализа</span><strong>Настройки кабинета обновлены</strong></div>
          </div>
        </div>
      </section>

      <section className="home-section audience-section-new">
        <div className="page-wrap audience-layout"><div className="section-intro"><p className="home-kicker"><span /> кому подходит</p><h2>Когда спрос уже есть, но его нужно <em>забрать в работу.</em></h2></div><div className="audience-list"><p>B2B-компаниям с активным отделом продаж</p><p>Бизнесам с понятными конкурентами</p><p>Нишам, где клиент сравнивает предложения</p><p>Командам, которым нужен дополнительный поток контактов</p></div></div>
      </section>

      <section className="pricing-section" id="tariffs">
        <div className="page-wrap"><div className="section-intro pricing-intro"><p className="home-kicker"><span /> тарифы</p><h2>Стоимость зависит от формата и <em>объёма пакета.</em></h2><p>Стандартные пакеты — от 1 000 до 10 000 контактов. Для объёма от 50 000 контактов подготовим индивидуальный расчёт.</p></div><div className="pricing-grid"><article className="pricing-panel"><div className="pricing-panel-head"><small>Контакты без обзвона</small><strong>от 40 до 65 ₽ <i>за контакт</i></strong><p>Контакты передаются вашему отделу продаж для самостоятельной обработки</p></div><div className="price-row"><span>1 000 контактов</span><b>65 000 ₽</b><small>65 ₽ / контакт</small></div><div className="price-row"><span>3 000 контактов</span><b>155 000 ₽</b><small>≈ 51,7 ₽ / контакт</small></div><div className="price-row"><span>10 000 контактов</span><b>400 000 ₽</b><small>40 ₽ / контакт</small></div><div className="price-row price-row-last"><span>от 50 000 контактов</span><b>индивидуально</b><small>расчёт под объём</small></div></article><article className="pricing-panel pricing-panel-accent"><div className="pricing-panel-head"><small>Контакты с первичной квалификацией</small><strong>от 75,5 до 110 ₽ <i>за контакт</i></strong><p>Колл-центр связывается с контактом, уточняет задачу и передаёт готовых к разговору лидов</p></div><div className="price-row"><span>1 000 контактов</span><b>110 000 ₽</b><small>110 ₽ / контакт</small></div><div className="price-row"><span>3 000 контактов</span><b>275 000 ₽</b><small>≈ 91,7 ₽ / контакт</small></div><div className="price-row"><span>10 000 контактов</span><b>755 000 ₽</b><small>75,5 ₽ / контакт</small></div><div className="price-row price-row-last"><span>от 50 000 контактов</span><b>индивидуально</b><small>расчёт под объём</small></div></article></div></div>
      </section>

      <section className="home-section trust-section">
        <div className="page-wrap trust-compact"><div><p className="home-kicker"><span /> подтверждения</p><h2>Российский технологический продукт</h2><p>Работа проекта, источники контактов и результаты обработки отображаются в единой системе.</p></div><div className="trust-points"><span>Резидент «Сколково»</span><span>Продукт включён в реестр российского ПО Минцифры</span></div></div>
      </section>

      <section className="home-section faq-section-new" id="faq">
        <div className="page-wrap faq-layout"><div className="section-intro"><p className="home-kicker"><span /> ответы</p><h2>Что важно знать <em>до старта.</em></h2></div><div className="faq-list-new">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta" id="contact"><div className="final-cta-glow" aria-hidden="true" /><div className="page-wrap final-cta-inner"><p className="home-kicker"><span /> следующий шаг</p><h2>Найдём аудиторию, которая уже <em>смотрит в сторону вашей ниши.</em></h2><p>Обсудим задачу, формат работы и объём, который сможет обработать ваш отдел продаж.</p><a className="home-button home-button-primary" href="mailto:hello@techbdata.ru"><span>Получить расчёт</span><b aria-hidden="true">↗</b></a></div></section>

      <SiteFooter />
    </main>
  );
}
