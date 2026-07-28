"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { LeadForm, openLeadForm, SiteFooter, SiteHeader } from "./components/SiteChrome";

const heroPrimaryWords = [
  { text: "Клиенты", offset: 0, accent: false },
  { text: "ваших", offset: 8, accent: false },
  { text: "конкурентов", offset: 14, accent: true },
];

const launchSteps = [
  ["Согласовываем критерии", "Определяем нишу, географию и признаки подходящего контакта."],
  ["Подбираем источники", "Работаем с вашим списком компаний или самостоятельно подбираем сайты и номера."],
  ["Настраиваем передачу", "Контакты поступают напрямую вашему отделу продаж либо сначала проходят квалификацию колл-центром."],
];

const managerFields = [
  ["Телефон", "+7 9** *** 42 18"],
  ["Источник интереса", "Сайт отраслевой компании"],
  ["Задача", "Автоматизация контроля качества звонков"],
  ["Комментарий", "Готов посмотреть демонстрацию"],
  ["Запись звонка", "Доступна запись"],
];

const faqs = [
  ["Что именно передаётся отделу продаж?", "В зависимости от формата — контакт с источником и информацией об интересе либо лид после первичной квалификации колл-центром."],
  ["Можно ли обрабатывать контакты самостоятельно?", "Да. Первый формат рассчитан на отдел продаж, который самостоятельно связывается с полученной аудиторией."],
  ["Как выбираются источники?", "Вы можете предоставить свои списки сайтов и номеров либо поручить подбор команде techbdata."],
  ["Как рассчитывается стоимость?", "Точную стоимость рассчитываем после согласования аудитории, источников и необходимого объёма."],
];

function FloatingLeadCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem("techbdata-floating-cta-dismissed") === "1");
    } catch {
      setDismissed(false);
    }

    function updateVisibility() {
      const hero = document.querySelector(".home-hero");
      const finalForm = document.querySelector("#contact");
      if (!hero || !finalForm) {
        setVisible(false);
        return;
      }

      const heroPassed = hero.getBoundingClientRect().bottom < 0;
      const finalFormNear = finalForm.getBoundingClientRect().top < window.innerHeight * 0.86;
      setVisible(heroPassed && !finalFormNear);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem("techbdata-floating-cta-dismissed", "1");
    } catch {
      // Session storage may be disabled; the CTA still closes for the current render.
    }
  }

  if (!visible || dismissed) {
    return null;
  }

  return (
    <aside className="floating-lead-cta" aria-label="Быстрый переход к форме">
      <button className="floating-lead-action" type="button" onClick={openLeadForm}>Оставить заявку</button>
      <button className="floating-lead-close" type="button" onClick={dismiss} aria-label="Скрыть кнопку до конца сессии">×</button>
    </aside>
  );
}

function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !finePointer.matches || reducedMotion.matches) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      if (!cursor) {
        return;
      }

      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle("is-interactive", Boolean(target?.closest("a, button, summary")));
    }

    function handlePointerLeave() {
      cursor.classList.remove("is-visible", "is-interactive");
    }

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return <div className="cursor-follower" ref={cursorRef} aria-hidden="true"><i /></div>;
}

export default function Home() {
  return (
    <main className="home-page">
      <SmoothCursor />
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
            <span className="hero-line hero-line-primary" aria-hidden="true">
              {heroPrimaryWords.map(({ text, offset, accent }, wordIndex) => (
                <Fragment key={text}>
                  <span className={`hero-primary-word${accent ? " hero-primary-word-accent" : ""}`}>
                    {Array.from(text).map((letter, letterIndex) => (
                      <span
                        className="hero-letter"
                        key={`${text}-${letterIndex}`}
                        style={{ animationDelay: `${0.12 + (offset + letterIndex) * 0.028}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  {wordIndex < heroPrimaryWords.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </span>
            <span className="hero-separator" aria-hidden="true"> — </span>
            <span className="hero-line hero-line-secondary"><span>в</span>{" "}<span>вашем</span>{" "}<span>отделе</span>{" "}<span>продаж</span></span>
          </h1>
          <p className="home-hero-lead">techbdata находит контакты людей, которые посещали сайты, звонили или взаимодействовали с предложениями компаний вашей ниши. Получайте контакты напрямую в отдел продаж или после первичной квалификации колл-центром.</p>
          <div className="home-hero-actions">
            <button className="home-button home-button-primary" type="button" onClick={openLeadForm}><span>Оставить заявку</span><b aria-hidden="true">↗</b></button>
            <a className="home-button-link" href="#mechanics">Как это работает <span aria-hidden="true">↓</span></a>
          </div>
          <div className="home-trust" aria-label="Подтверждения"><span>Резидент «Сколково»</span><span>Продукт включён в реестр российского ПО Минцифры</span></div>
        </div>
      </section>

      <section className="home-section audience-capture-section" id="why">
        <div className="page-wrap split-heading">
          <div><h2>Конкуренты уже привлекли аудиторию. <em>Получите её контакты</em></h2></div>
          <p>Передайте нам список компаний или задайте критерии целевой аудитории. Команда techbdata подберёт подходящие сайты и номера и настроит получение контактов по реальным действиям аудитории.</p>
        </div>
        <div className="page-wrap capture-scenario" aria-label="Реклама отраслевой компании приводит человека на сайт, после чего контакт поступает в отдел продаж">
          <div className="scenario-stage scenario-ad">
            <small>Предложение компании ниши</small>
            <div className="scenario-ad-window"><strong>Автоматизация отдела продаж</strong><span>Перейти на сайт</span></div>
          </div>
          <div className="scenario-stage scenario-visit">
            <small>Действие аудитории</small>
            <div className="scenario-browser-window"><span>company-site.ru</span><strong>Повторный визит зафиксирован</strong></div>
          </div>
          <div className="scenario-stage scenario-card">
            <small>Контакт и источник</small>
            <strong>+7 9** *** 42 18</strong>
            <span>Источник: сайт отраслевой компании</span>
          </div>
          <div className="scenario-stage scenario-delivery">
            <small>Отдел продаж</small>
            <strong>Новый контакт получен</strong>
            <span>Данные готовы для первого звонка</span>
          </div>
          <div className="scenario-progress" aria-hidden="true"><i /></div>
        </div>
        <p className="page-wrap contact-principle">Платите за контакты, а не за показы и клики.</p>
      </section>

      <section className="home-section source-section" id="sources">
        <div className="page-wrap">
          <div className="section-intro section-intro-centered">
            <p className="home-kicker"><span /> источники контактов</p>
            <h2>Получайте контакты по <em>реальным действиям аудитории</em></h2>
            <p>Источником становится конкретное действие человека: посещение сайта, звонок или взаимодействие с предложением компании вашей ниши.</p>
          </div>
          <div className="source-scenes">
            <article className="source-scene browser-scene">
              <h3>Посещали сайты ваших конкурентов</h3>
              <div className="mini-browser" aria-label="Демонстрация посещения сайта">
                <div className="browser-bar"><span /><span /><span /><b>company-site.ru</b></div>
                <div className="browser-body"><small>Сайт компании</small><strong>Раздел «Услуги»</strong><div className="browser-nav"><i>Главная</i><i className="visited-section">Услуги</i><i>О компании</i></div><div className="visit-log"><span>Повторный визит</span><b>Источник зафиксирован</b></div></div>
              </div>
              <div className="scene-output"><span>Контакт добавлен</span></div>
            </article>

            <article className="source-scene call-scene">
              <h3>Звонили по номерам ваших конкурентов</h3>
              <div className="call-interface" aria-label="Демонстрация данных звонка">
                <div className="call-head"><span className="call-avatar">☎</span><div><small>Звонок в компанию вашей ниши</small><strong>+7 916 *** 42 18</strong></div><b>Москва</b></div>
                <dl><div><dt>Интерес</dt><dd>Автоматизация контроля качества звонков</dd></div><div><dt>Отдел продаж</dt><dd>Около 25 менеджеров</dd></div><div><dt>Следующий шаг</dt><dd>Хочет посмотреть демонстрацию на следующей неделе</dd></div></dl>
              </div>
              <div className="scene-output"><span>Контакт добавлен</span></div>
            </article>

            <article className="source-scene inquiry-scene">
              <h3>Взаимодействовали с предложениями конкурентов</h3>
              <div className="inquiry-interface" aria-label="Обезличенная демонстрационная карточка обращения">
                <div className="inquiry-head"><span>А</span><div><small>Обращение</small><strong>Алексей · +7 977 *** 19 01</strong></div></div>
                <p>Система видеонаблюдения для производственного объекта</p>
                <ul><li>Объект около 4 000 м²</li><li>Сравнивает несколько подрядчиков</li><li>Требуется предварительный расчёт</li><li>Готов принять звонок завтра после 14:00</li></ul>
              </div>
              <div className="scene-output"><span>Контакт добавлен</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section mechanics-section" id="mechanics">
        <div className="page-wrap">
          <div className="section-intro section-intro-centered">
            <p className="home-kicker"><span /> механика продукта</p>
            <h2>Как контакт попадает <em>в ваш отдел продаж</em></h2>
          </div>
          <div className="product-process" aria-label="Источник, действие аудитории, выбор формата, квалификация и передача данных менеджеру">
            <div className="process-track" aria-hidden="true"><i /></div>

            <article className="process-step process-select">
              <small>Источники</small>
              <strong>Выбираем сайты и номера</strong>
              <div className="source-check">
                <span className="checked">Сайты компаний вашей ниши</span>
                <span className="checked">Номера отделов продаж</span>
              </div>
            </article>

            <article className="process-step process-receive">
              <small>Действие аудитории</small>
              <strong>Определяем контакт и источник</strong>
              <div className="process-action-states">
                <i>Повторный визит на сайт</i>
                <i>Контакт определён</i>
                <i>Источник сохранён</i>
              </div>
            </article>

            <article className="process-step process-route">
              <small>Формат обработки</small>
              <strong>Передаём напрямую или квалифицируем</strong>
              <div className="route-options">
                <span>Сразу в отдел продаж</span>
                <span className="route-active">Сначала в колл-центр</span>
              </div>
              <div className="qualification-data">
                <i>Задача уточнена</i>
                <i>Готовность к разговору подтверждена</i>
                <i>Комментарий добавлен</i>
                <i>Запись сохранена</i>
              </div>
            </article>

            <article className="process-step process-crm">
              <small>Результат</small>
              <strong>Данные для первого разговора</strong>
              <div className="result-fields">
                <span><b>Телефон</b><i>+7 9** *** 42 18</i></span>
                <span><b>Источник интереса</b><i>Сайт компании</i></span>
                <span><b>Задача</b><i>Уточнена</i></span>
                <span><b>Комментарий</b><i>Добавлен</i></span>
                <span><b>Запись звонка</b><i>Сохранена</i></span>
              </div>
              <div className="result-status">Передано менеджеру</div>
            </article>

            <div className="process-contact" aria-hidden="true">контакт</div>
          </div>
        </div>
      </section>

      <section className="home-section formats-section-new" id="formats">
        <div className="page-wrap">
          <div className="section-intro"><p className="home-kicker"><span /> два формата работы</p><h2>Получайте контакты напрямую <em>или после квалификации</em></h2></div>
          <div className="format-panels-new">
            <article><small>Самостоятельная обработка</small><h3>Контакты без обзвона</h3><p>Получаете номер, источник и доступную информацию о совершённом действии. Ваш отдел продаж самостоятельно связывается с контактом и продолжает коммуникацию.</p><strong className="format-result">Контакт и источник интереса</strong><a href="#tariffs">Посмотреть стоимость <span>↗</span></a></article>
            <article className="format-panel-highlight"><small>Первичная квалификация</small><h3>Контакты после квалификации</h3><p>Колл-центр проверяет соответствие согласованным критериям, уточняет актуальность задачи и готовность продолжить разговор. Ваш менеджер получает контакт, комментарий оператора и запись звонка.</p><strong className="format-result">Контакт, задача, комментарий и запись</strong><a href="#tariffs">Посмотреть стоимость <span>↗</span></a></article>
          </div>
        </div>
      </section>

      <section className="home-section manager-section">
        <div className="page-wrap manager-layout">
          <div className="section-intro"><p className="home-kicker"><span /> данные для разговора</p><h2>Менеджер получает не просто номер, а <em>данные для первого разговора</em></h2><p>В карточке отображаются контакт и источник интереса. После квалификации — задача клиента, комментарий оператора и запись разговора.</p></div>
          <div className="manager-card"><div className="manager-card-head"><span>Карточка после квалификации</span><b>techbdata</b></div>{managerFields.map(([field, value]) => <div className="manager-row" key={field}><span>{field}</span><strong>{value}</strong></div>)}</div>
        </div>
      </section>

      <section className="home-section launch-section" id="launch">
        <div className="page-wrap">
          <div className="section-intro"><p className="home-kicker"><span /> запуск проекта</p><h2>Запускаем проект под <em>вашу целевую аудиторию</em></h2></div>
          <div className="launch-grid">{launchSteps.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="home-section optimization-section">
        <div className="page-wrap optimization-layout">
          <div className="section-intro"><p className="home-kicker"><span /> сопровождение и оптимизация</p><h2>Над вашим кабинетом работает <em>команда специалистов</em></h2><p>Команда techbdata регулярно проверяет качество контактов по каждому источнику. Слабые сайты и номера отключаем, новые тестируем, а объём увеличиваем по направлениям, которые приводят подходящую аудиторию.</p></div>
          <div className="optimization-console" aria-label="Демонстрация работы команды с качеством источников">
            <div className="optimization-row source-good"><span>Целевая аудитория подтверждается</span><b>Увеличиваем объём</b></div>
            <div className="optimization-row source-weak"><span>Много неподходящих контактов</span><b>Отключаем источник</b></div>
            <div className="optimization-row source-test"><span>Новый источник</span><b>Проверяем на тестовой выборке</b></div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="tariffs">
        <div className="page-wrap">
          <div className="section-intro pricing-intro"><p className="home-kicker"><span /> стоимость</p><h2>Стоимость контакта зависит от <em>формата обработки</em></h2><p>Точную стоимость рассчитываем после согласования аудитории, источников и необходимого объёма.</p></div>
          <div className="pricing-grid">
            <article className="pricing-panel">
              <div className="pricing-panel-head"><small>Контакты без обзвона</small><strong>40–60 ₽ <i>за контакт</i></strong><p>Контакт и информация об источнике поступают вашему отделу продаж.</p></div>
            </article>
            <article className="pricing-panel pricing-panel-accent">
              <div className="pricing-panel-head"><small>Контакты с квалификацией</small><strong>70–110 ₽ <i>за контакт</i></strong><p>Колл-центр уточняет задачу и передаёт контакт с комментарием оператора и записью разговора.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section trust-section">
        <div className="page-wrap trust-compact"><div><p className="home-kicker"><span /> подтверждения</p><h2>Российский технологический продукт</h2><p>Работа проекта, источники контактов и результаты обработки отображаются в единой системе.</p></div><div className="trust-points"><span>Резидент «Сколково»</span><span>Продукт включён в реестр российского ПО Минцифры</span></div></div>
      </section>

      <section className="home-section faq-section-new" id="faq">
        <div className="page-wrap faq-layout"><div className="section-intro"><p className="home-kicker"><span /> ответы</p><h2>Что важно знать <em>до старта.</em></h2></div><div className="faq-list-new">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta" id="contact">
        <div className="final-cta-glow" aria-hidden="true" />
        <div className="page-wrap final-cta-inner">
          <div className="final-cta-copy"><p className="home-kicker"><span /> следующий шаг</p><h2>Получите расчёт под вашу целевую аудиторию</h2><p>Оставьте имя и номер. Мы уточним вашу нишу, подходящие источники и формат получения контактов.</p></div>
          <LeadForm className="final-lead-form" />
        </div>
      </section>

      <SiteFooter />
      <FloatingLeadCta />
    </main>
  );
}
