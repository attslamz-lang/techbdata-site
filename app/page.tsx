"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { LeadForm, SiteFooter, SiteHeader, openLeadForm } from "./components/SiteChrome";

const qualifiedDetails = [
  "Объект около 4 000 м²",
  "Сравнивает несколько подрядчиков",
  "Требуется предварительный расчёт",
  "Готов принять звонок завтра после 14:00",
];

const productSteps = [
  {
    title: "Вы задаёте критерии целевой аудитории",
    text: "Опишите нужные компании, географию и признаки подходящего контакта. При желании передайте список конкретных конкурентов.",
  },
  {
    title: "Мы настраиваем кабинет",
    text: "Команда techbdata самостоятельно подбирает и подключает подходящие сайты, номера и другие источники.",
  },
  {
    title: "Фиксируем действия аудитории у конкурентов",
    text: "Учитываем посещение сайта, звонок или обращение по предложению компании выбранной ниши.",
  },
  {
    title: "Передаём контакт вашему отделу продаж",
    text: "Контакт поступает напрямую менеджеру либо сначала проходит квалификацию колл-центром.",
  },
];

const sourceScenes = [
  {
    type: "site",
    eyebrow: "Сайт",
    title: "Посещение сайта конкурента",
    description: "Человек изучает услугу компании выбранной ниши.",
    action: "Раздел услуги открыт",
    processing: "Действие обрабатывается",
  },
  {
    type: "call",
    eyebrow: "Звонок",
    title: "Звонок в отдел продаж",
    description: "Аудитория связывается с компанией по опубликованному номеру.",
    action: "Звонок зафиксирован",
    processing: "Источник сопоставляется",
  },
  {
    type: "offer",
    eyebrow: "Предложение",
    title: "Взаимодействие с предложением",
    description: "Человек проявляет интерес к предложению компании вашей категории.",
    action: "Интерес зафиксирован",
    processing: "Данные обрабатываются",
  },
];

const qualityRows = [
  { source: "Сайты интеграторов", state: "Стабильный", action: "Продолжаем работу", tone: "stable" },
  { source: "Номера отделов продаж", state: "Проверяется", action: "Анализируем обратную связь", tone: "review" },
  { source: "Новая группа сайтов", state: "Новый источник", action: "Тестируем", tone: "new" },
  { source: "Источник с низким качеством", state: "Слабый источник", action: "Отключён и заменён", tone: "off" },
];

const faqs = [
  {
    question: "Какие данные получает менеджер?",
    answer:
      "Без обзвона менеджер получает телефон, источник, совершённое действие и дату. После квалификации к карточке добавляются задача, комментарий оператора и запись разговора.",
  },
  {
    question: "Откуда берутся контакты?",
    answer:
      "Источниками становятся действия аудитории на сайтах, звонки по номерам и взаимодействия с предложениями компаний выбранной ниши.",
  },
  {
    question: "Можно ли передать собственный список конкурентов?",
    answer:
      "Да. Вы можете передать список конкретных компаний. Если списка нет, команда techbdata подберёт подходящие сайты и номера по согласованным критериям.",
  },
  {
    question: "Чем это отличается от покупки готовой базы?",
    answer:
      "Проект настраивается под вашу аудиторию и опирается на конкретные действия людей у выбранных источников. Вы получаете контакты по мере их добавления, а не статичный список.",
  },
  {
    question: "Как контролируется качество?",
    answer:
      "Команда techbdata анализирует обратную связь вашего отдела продаж, тестирует новые источники, продолжает работу со стабильными и заменяет слабые.",
  },
  {
    question: "Что входит в квалификацию?",
    answer:
      "Колл-центр уточняет соответствие согласованным критериям, актуальность задачи и готовность продолжить разговор. Менеджер получает комментарий оператора и запись разговора.",
  },
  {
    question: "Как контакты передаются отделу продаж?",
    answer:
      "Формат передачи согласовывается при настройке проекта. Контакты могут поступать напрямую вашему отделу продаж либо после квалификации колл-центром.",
  },
  {
    question: "От чего зависит стоимость?",
    answer:
      "На расчёт влияют параметры аудитории, выбранные источники, необходимый объём и критерии квалификации.",
  },
];

function useViewportAnimations() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function FloatingLeadCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem("techbdata-floating-cta-dismissed") === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const updateVisibility = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      const contact = document.getElementById("contact");
      const heroPassed = hero ? hero.getBoundingClientRect().bottom < 120 : window.scrollY > window.innerHeight * 0.8;
      const contactNear = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.92 : false;
      setVisible(heroPassed && !contactNear);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("techbdata-floating-cta-dismissed", "1");
    } catch {
      // The CTA still closes when session storage is unavailable.
    }
  };

  if (dismissed) return null;

  return (
    <aside className={`floating-lead-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <button className="floating-lead-close" type="button" onClick={dismiss} aria-label="Скрыть кнопку расчёта">
        ×
      </button>
      <button className="floating-lead-button" type="button" onClick={() => openLeadForm()} tabIndex={visible ? 0 : -1}>
        Рассчитать стоимость
      </button>
    </aside>
  );
}

function ResultExample() {
  const [mode, setMode] = useState<"direct" | "qualified">("qualified");
  const qualified = mode === "qualified";

  return (
    <section className="section result-section" id="result-example">
      <div className="section-shell result-shell">
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">Пример результата</span>
            <h2>Посмотрите, какие данные получает менеджер</h2>
          </div>
          <p>
            Переключите формат, чтобы увидеть разницу между контактом без обзвона и карточкой после квалификации.
          </p>
        </div>

        <div className="result-workspace" data-reveal>
          <div className="result-tabs" role="tablist" aria-label="Формат контакта">
            <button
              type="button"
              role="tab"
              aria-selected={!qualified}
              aria-controls="result-panel"
              className={!qualified ? "is-active" : ""}
              onClick={() => setMode("direct")}
            >
              Без обзвона
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={qualified}
              aria-controls="result-panel"
              className={qualified ? "is-active" : ""}
              onClick={() => setMode("qualified")}
            >
              После квалификации
            </button>
          </div>

          <div className={`crm-result-card ${qualified ? "is-qualified" : "is-direct"}`} id="result-panel" role="tabpanel">
            <div className="crm-card-topbar">
              <div>
                <span className="crm-kicker">Обращение</span>
                <strong>{qualified ? "Алексей · +7 977 *** 19 01" : "+7 977 *** 19 01"}</strong>
              </div>
              <span className={`crm-status ${qualified ? "qualified" : "direct"}`}>
                {qualified ? "Квалификация завершена" : "Добавлен в кабинет"}
              </span>
            </div>

            <div className="crm-result-grid">
              <div className="crm-main-column">
                <div className="crm-subject">
                  <span>Источник</span>
                  <strong>Сайт интегратора систем безопасности</strong>
                </div>
                <div className="crm-data-row">
                  <span>Совершённое действие</span>
                  <strong>Посещение страницы «Видеонаблюдение для бизнеса»</strong>
                </div>
                <div className="crm-data-row">
                  <span>Дата</span>
                  <strong>Сегодня, 12:40</strong>
                </div>

                {qualified && (
                  <div className="crm-qualified-data" aria-live="polite">
                    <div className="crm-subject crm-subject-accent">
                      <span>Задача</span>
                      <strong>Система видеонаблюдения для производственного объекта</strong>
                    </div>
                    <ul>
                      {qualifiedDetails.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <aside className={`operator-panel${qualified ? " is-visible" : ""}`}>
                {qualified ? (
                  <>
                    <div className="operator-heading">
                      <span>Комментарий оператора</span>
                      <span className="audio-record">Запись разговора · 04:18</span>
                    </div>
                    <p>
                      «Алексей отвечает за выбор подрядчика. Компания собирает предложения на установку системы
                      видеонаблюдения для производственного объекта площадью около 4 000 м². Необходимо рассчитать
                      размещение камер внутри помещений и по периметру территории. Рассматривает несколько компаний,
                      окончательное решение пока не принято. Готов обсудить задачу с техническим специалистом завтра
                      после 14:00. Просил предварительно подготовить ориентировочный список вопросов для расчёта.»
                    </p>
                  </>
                ) : (
                  <div className="operator-empty">
                    <span>Без квалификации</span>
                    <p>Задача, комментарий оператора и запись разговора в этом формате не добавляются.</p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  useViewportAnimations();

  return (
    <div className="home-page">
      <SiteHeader />

      <main>
        <section className="hero" id="top">
          <div className="hero-ambient" aria-hidden="true">
            <span className="hero-bloom hero-bloom-one" />
            <span className="hero-bloom hero-bloom-two" />
            <span className="hero-bloom hero-bloom-three" />
            <span className="hero-bloom hero-bloom-four" />
            <span className="hero-light-pass" />
            <span className="hero-grain" />
          </div>

          <div className="hero-shell">
            <div className="hero-copy">
              <span className="hero-kicker">Контакты аудитории вашей ниши</span>
              <h1 aria-label="Получайте контакты клиентов ваших конкурентов">
                <span>Получайте контакты</span>
                <span>клиентов ваших конкурентов</span>
              </h1>
              <p className="hero-description">
                techbdata определяет контакты людей, которые посещали сайты, звонили или взаимодействовали с
                предложениями компаний выбранной ниши. Контакты передаются напрямую вашему отделу продаж либо после
                квалификации колл-центром.
              </p>
              <div className="hero-actions">
                <button className="button button-primary" type="button" onClick={() => openLeadForm()}>
                  Рассчитать стоимость контактов
                </button>
                <a className="button button-secondary" href="#result-example">
                  Посмотреть пример результата
                </a>
              </div>
              <div className="hero-trust" aria-label="Подтверждения">
                <div>
                  <span className="trust-mark" aria-hidden="true">S</span>
                  <span>Резидент «Сколково»</span>
                </div>
                <div>
                  <span className="trust-mark trust-mark-register" aria-hidden="true">РФ</span>
                  <span>В реестре российского ПО</span>
                </div>
              </div>
            </div>

            <div className="hero-product-scene" aria-label="Путь контакта от источника до менеджера">
              <div className="hero-scene-bar">
                <span>techbdata · поток контактов</span>
                <span className="live-state"><i /> Система активна</span>
              </div>
              <div className="hero-scene-body">
                <div className="hero-stage hero-stage-source">
                  <span className="stage-label">Источник</span>
                  <div className="source-browser-mini">
                    <span className="browser-dots" />
                    <strong>Сайт компании вашей ниши</strong>
                    <span>Раздел услуги</span>
                  </div>
                  <div className="source-call-mini">
                    <span className="phone-icon">☎</span>
                    <div><strong>Отдел продаж</strong><span>Входящий звонок</span></div>
                  </div>
                </div>

                <div className="hero-flow-track" aria-hidden="true"><span /></div>

                <div className="hero-stage hero-stage-action">
                  <span className="stage-label">Действие</span>
                  <strong>Интерес зафиксирован</strong>
                  <span>Источник сопоставлен</span>
                </div>

                <div className="hero-flow-track" aria-hidden="true"><span /></div>

                <div className="hero-stage hero-stage-contact">
                  <span className="stage-label">Контакт</span>
                  <div className="contact-avatar">А</div>
                  <div><strong>+7 977 *** 19 01</strong><span>Данные добавлены</span></div>
                </div>

                <div className="hero-flow-track" aria-hidden="true"><span /></div>

                <div className="hero-stage hero-stage-manager">
                  <span className="stage-label">Менеджер</span>
                  <strong>Готово к звонку</strong>
                  <span>Карточка в отделе продаж</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ResultExample />

        <section className="section logic-section" id="mechanics">
          <div className="section-shell">
            <div className="section-heading logic-heading">
              <span className="eyebrow">Логика продукта</span>
              <h2>Конкуренты вкладываются в рекламу, а их трафиком пользуетесь вы</h2>
              <p>
                Вы определяете, какая аудитория нужна вашему отделу продаж. Настройку источников и передачу контактов
                берёт на себя команда techbdata.
              </p>
            </div>

            <div className="logic-route" data-reveal>
              <div className="logic-spine" aria-hidden="true"><span /></div>
              {productSteps.map((step, index) => (
                <article className="logic-step" key={step.title} style={{ "--step-index": index } as CSSProperties}>
                  <span className="logic-step-marker" aria-hidden="true">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="logic-accent">
              <span>Платите за контакты, а не за показы и клики.</span>
              <button type="button" onClick={() => openLeadForm()}>Обсудить вашу аудиторию</button>
            </div>
          </div>
        </section>

        <section className="section sources-section" id="sources">
          <div className="section-shell">
            <div className="section-heading section-heading-centered">
              <span className="eyebrow">Источники контактов</span>
              <h2>Получаем контакты по конкретным действиям аудитории</h2>
              <p>
                Три сценария работают по одной последовательности: действие фиксируется, данные обрабатываются, контакт
                определяется и добавляется в кабинет.
              </p>
            </div>

            <div className="source-scenes" data-reveal>
              {sourceScenes.map((scene, index) => (
                <article
                  className={`source-scene source-scene-${scene.type}`}
                  key={scene.type}
                  style={{ "--scene-index": index } as CSSProperties}
                >
                  <div className="source-scene-heading">
                    <span>{scene.eyebrow}</span>
                    <h3>{scene.title}</h3>
                    <p>{scene.description}</p>
                  </div>

                  <div className={`source-visual source-visual-${scene.type}`} aria-hidden="true">
                    {scene.type === "site" && (
                      <div className="scene-browser">
                        <div className="scene-browser-top"><i /><i /><i /><span>security-example.ru</span></div>
                        <div className="scene-browser-content"><b>Видеонаблюдение для бизнеса</b><span>Расчёт решения для объекта</span></div>
                        <span className="scene-pointer" />
                      </div>
                    )}
                    {scene.type === "call" && (
                      <div className="scene-phone">
                        <span className="scene-phone-icon">☎</span>
                        <strong>Отдел продаж</strong>
                        <span>+7 495 *** ** 42</span>
                        <i className="call-wave"><b /><b /><b /><b /><b /></i>
                      </div>
                    )}
                    {scene.type === "offer" && (
                      <div className="scene-message">
                        <span className="message-label">Предложение компании</span>
                        <strong>Уточнить условия и расчёт</strong>
                        <div><i /> Сообщение отправлено</div>
                      </div>
                    )}
                  </div>

                  <ol className="source-sequence">
                    <li><i />{scene.action}</li>
                    <li><i />{scene.processing}</li>
                    <li><i />Контакт определён</li>
                    <li><i />Контакт добавлен</li>
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section formats-section" id="formats">
          <div className="section-shell">
            <div className="section-heading section-heading-split formats-heading">
              <div>
                <span className="eyebrow">Два формата</span>
                <h2>Получайте контакты напрямую или после квалификации</h2>
              </div>
              <p>Выберите, какие данные нужны вашему менеджеру перед первым звонком.</p>
            </div>

            <div className="formats-split" data-reveal>
              <article className="format-panel format-direct">
                <span className="format-label">Без обзвона</span>
                <h3>Контакт поступает напрямую</h3>
                <p>
                  Ваш отдел продаж самостоятельно связывается с человеком и продолжает коммуникацию.
                </p>
                <div className="format-data-stack">
                  <div><span>Телефон</span><strong>+7 977 *** 19 01</strong></div>
                  <div><span>Источник</span><strong>Сайт компании вашей ниши</strong></div>
                  <div><span>Действие</span><strong>Посещение страницы услуги</strong></div>
                  <div><span>Дата</span><strong>Сегодня, 12:40</strong></div>
                </div>
              </article>

              <div className="format-divider" aria-hidden="true">
                <span>Колл-центр добавляет</span>
              </div>

              <article className="format-panel format-qualified">
                <span className="format-label">После квалификации</span>
                <h3>Менеджер получает больше данных</h3>
                <p>
                  Колл-центр уточняет задачу и готовность продолжить разговор по согласованным критериям.
                </p>
                <div className="format-data-stack format-added-data">
                  <div><span>Задача</span><strong>Видеонаблюдение для объекта</strong></div>
                  <div><span>Комментарий</span><strong>Краткое описание запроса</strong></div>
                  <div><span>Удобное время</span><strong>Завтра после 14:00</strong></div>
                  <div><span>Запись разговора</span><strong>04:18</strong></div>
                </div>
              </article>
            </div>

            <div className="formats-action">
              <button className="button button-primary" type="button" onClick={() => openLeadForm()}>
                Подобрать формат под вашу задачу
              </button>
            </div>
          </div>
        </section>

        <section className="section quality-section" id="quality">
          <div className="section-shell quality-shell">
            <div className="quality-copy">
              <span className="eyebrow">Контроль качества</span>
              <h2>Проектом управляет команда techbdata</h2>
              <p>
                Вы не покупаете статичную базу и не разбираетесь в настройках. Команда techbdata контролирует
                источники, анализирует обратную связь отдела продаж и корректирует проект. Вам достаточно задать
                аудиторию, получать контакты и сообщать, какие из них подходят лучше.
              </p>
              <div className="quality-feedback">
                <span>Обратная связь отдела продаж</span>
                <strong>Помогает точнее управлять источниками</strong>
              </div>
            </div>

            <div className="quality-console" data-reveal>
              <div className="console-topbar">
                <div><i /><span>Центр управления источниками</span></div>
                <span>Обновлено сегодня</span>
              </div>
              <div className="quality-table" role="table" aria-label="Статусы источников">
                <div className="quality-table-head" role="row">
                  <span role="columnheader">Источник</span>
                  <span role="columnheader">Статус</span>
                  <span role="columnheader">Действие команды</span>
                </div>
                {qualityRows.map((row, index) => (
                  <div className="quality-row" role="row" key={row.state} style={{ "--row-index": index } as CSSProperties}>
                    <span role="cell">{row.source}</span>
                    <span role="cell" className={`quality-state quality-state-${row.tone}`}><i />{row.state}</span>
                    <strong role="cell">{row.action}</strong>
                  </div>
                ))}
              </div>
              <div className="console-summary">
                <span>Текущий фокус</span>
                <strong>Стабильные источники и тест новых направлений</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section case-section" id="cases">
          <div className="section-shell">
            {/* TODO: Replace this demonstrational scenario with a confirmed techbdata case. */}
            <div className="demo-case" data-reveal>
              <div className="demo-case-copy">
                <span className="demo-warning">Требуется замена на подтверждённый кейс.</span>
                <span className="eyebrow">Временный пример</span>
                <h2>Демонстрационный сценарий проекта</h2>
                <p>
                  Сценарий показывает логику будущего кейса без вымышленных результатов, показателей и названия клиента.
                </p>
              </div>
              <div className="demo-case-details">
                <div><span>Ниша</span><strong>Системы безопасности для коммерческих и производственных объектов</strong></div>
                <div><span>Задача</span><strong>Находить компании, выбирающие подрядчика</strong></div>
                <div><span>Источники</span><strong>Сайты интеграторов и номера отделов продаж</strong></div>
                <div><span>Результат</span><strong>Контакты после квалификации с описанием объекта, задачи и удобного времени для звонка</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section launch-section" id="launch">
          <div className="section-shell launch-shell">
            <div className="section-heading launch-heading">
              <span className="eyebrow">Запуск проекта</span>
              <h2>Вам не нужно ничего настраивать самостоятельно</h2>
              <p>
                Вы описываете нужную аудиторию и при желании передаёте список конкурентов. Остальную настройку выполняет
                команда techbdata.
              </p>
            </div>

            <div className="launch-timeline" data-reveal>
              <article>
                <i aria-hidden="true" />
                <h3>Согласовываем аудиторию</h3>
                <p>Определяем нишу, географию и признаки подходящего контакта.</p>
                <span>От вас: описание аудитории</span>
              </article>
              <article>
                <i aria-hidden="true" />
                <h3>Подбираем сайты и номера</h3>
                <p>Работаем с вашим списком конкурентов или самостоятельно формируем источники.</p>
                <span>От techbdata: подбор и настройка</span>
              </article>
              <article>
                <i aria-hidden="true" />
                <h3>Настраиваем передачу контактов</h3>
                <p>Контакты поступают напрямую или после квалификации. Вы сообщаете команде, какие подходят лучше.</p>
                <span>Совместно: обратная связь по качеству</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="tariffs">
          <div className="section-shell">
            <div className="section-heading pricing-heading">
              <span className="eyebrow">Стоимость</span>
              <h2>Стоимость контакта зависит от формата и параметров проекта</h2>
              <p>
                На расчёт влияют аудитория, выбранные источники, необходимый объём и критерии квалификации.
              </p>
            </div>

            <div className="pricing-stage" data-reveal>
              <article className="price-option">
                <div>
                  <span>Контакты без обзвона</span>
                  <strong>40–60 ₽</strong>
                  <small>за контакт</small>
                </div>
                <p>Телефон, источник, совершённое действие и дата поступают вашему отделу продаж.</p>
              </article>
              <article className="price-option price-option-accent">
                <div>
                  <span>Контакты с квалификацией</span>
                  <strong>70–110 ₽</strong>
                  <small>за контакт</small>
                </div>
                <p>Колл-центр уточняет задачу и добавляет комментарий оператора и запись разговора.</p>
              </article>
              <div className="pricing-cta-panel">
                <span>Расчёт под вашу нишу</span>
                <p>Уточним параметры аудитории и предложим подходящий формат.</p>
                <button className="button button-primary" type="button" onClick={() => openLeadForm()}>
                  Получить расчёт по своей нише
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-shell faq-shell">
            <div className="faq-heading">
              <span className="eyebrow">FAQ</span>
              <h2>Вопросы о продукте</h2>
              <p>Коротко о данных, настройке проекта, качестве и стоимости.</p>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-shell contact-shell">
            <div className="contact-copy">
              <span className="eyebrow">Следующий шаг</span>
              <h2>Получите расчёт под вашу целевую аудиторию</h2>
              <p>Уточним нишу, подходящие источники и формат получения контактов.</p>
              <div className="contact-notes">
                <span>Аудитория и география</span>
                <span>Подходящие источники</span>
                <span>Формат получения контактов</span>
              </div>
            </div>
            <div className="contact-form-panel">
              <LeadForm className="inline-lead-form" />
            </div>
          </div>
        </section>
      </main>

      <FloatingLeadCta />
      <SiteFooter />
    </div>
  );
}
