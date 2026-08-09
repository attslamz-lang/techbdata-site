"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { ContactFormatScene, ControlLoop, SourcesShowcase } from "./components/HomeProductScenes";
import { MeshDriftBackground } from "./components/MeshDriftBackground";
import { DataRailButton } from "./components/MotionPrimitives";
import { ParticleSphere } from "./components/ParticleSphere";
import { LeadForm, SiteFooter, SiteHeader, openLeadForm } from "./components/SiteChrome";

const productSteps = [
  {
    title: "Вы описываете портрет клиента",
    text: "Ниша, география и признаки нужного клиента. Если есть конкретные конкуренты — передаёте их список.",
  },
  {
    title: "Мы настраиваем источники",
    text: "Настраиваем выбранные сайты и номера и передаём контакты после посещения, звонка или SMS. Вам ничего не нужно подключать самостоятельно.",
  },
  {
    title: "Передаём контакты в отдел продаж",
    text: "Фиксируем нужное действие и передаём контакт напрямую менеджеру или сначала в колл-центр на квалификацию.",
  },
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
      "Учитываем посещения выбранных сайтов и страниц, звонки конкурентам, а также входящие и исходящие SMS по выбранным номерам.",
  },
  {
    question: "Можно ли передать собственный список конкурентов?",
    answer:
      "Да. Вы можете передать список конкретных компаний. Если списка нет, команда techbdata подберёт подходящие сайты и номера по согласованным критериям.",
  },
  {
    question: "Чем это отличается от покупки готовой базы?",
    answer:
      "Мы настраиваем источники под портрет вашего клиента. Контакты появляются после конкретных действий, а не приходят готовым статичным списком.",
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

const MIN_CPL = 500;
const MAX_CPL = 10_000;

function CplCalculator() {
  const [currentCpl, setCurrentCpl] = useState(2545);
  const normalized = Math.min(1, Math.max(0, (currentCpl - MIN_CPL) / (MAX_CPL - MIN_CPL)));
  const coefficient = 0.3 + normalized * 0.05;
  const techbdataCpl = Math.round(currentCpl * coefficient);
  const reduction = Math.round((1 - techbdataCpl / currentCpl) * 100);
  const formatCurrency = (value: number) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;

  return (
    <div className="cpl-calculator" data-reveal>
      <div className="cpl-input-panel">
        <span className="cpl-label">Укажите текущую стоимость лида в вашем бизнесе</span>
        <output className="cpl-current-value" htmlFor="current-cpl">
          {formatCurrency(currentCpl)}
        </output>
        <input
          id="current-cpl"
          className="cpl-range"
          type="range"
          min={MIN_CPL}
          max={MAX_CPL}
          step="5"
          value={currentCpl}
          aria-label="Текущая стоимость лида"
          aria-valuetext={formatCurrency(currentCpl)}
          style={{ "--range-progress": `${normalized * 100}%` } as CSSProperties}
          onChange={(event) => setCurrentCpl(Number(event.currentTarget.value))}
        />
        <div className="cpl-range-scale" aria-hidden="true">
          <span>{formatCurrency(MIN_CPL)}</span>
          <span>{formatCurrency(MAX_CPL)}</span>
        </div>
      </div>

      <div className="cpl-result-panel" aria-live="polite">
        <span className="cpl-label">Ориентировочная стоимость лида с techbdata</span>
        <output className="cpl-tech-value">≈ {formatCurrency(techbdataCpl)}</output>
        <strong>Примерно на {reduction}% ниже текущей стоимости</strong>
      </div>

      <p className="cpl-note">
        Расчёт ориентировочный. Фактическая стоимость зависит от аудитории, источников и параметров проекта.
      </p>
    </div>
  );
}

export default function HomePage() {
  useViewportAnimations();

  return (
    <div className="home-page">
      <SiteHeader />

      <main>
        <section className="hero" id="top">
          <MeshDriftBackground />

          <div className="hero-shell">
            <div className="hero-copy">
              <span className="hero-kicker">Контакты аудитории вашей ниши</span>
              <h1 aria-label="Получайте контакты клиентов ваших конкурентов">
                <span>Получайте контакты клиентов</span>
                <span>ваших конкурентов</span>
              </h1>
              <p className="hero-description">
                Клиенты вашей ниши посещают сайты конкурентов, звонят и взаимодействуют с выбранными источниками.
                techbdata фиксирует эти действия и передаёт контакты вашему отделу продаж — напрямую или после квалификации.
              </p>
              <div className="hero-actions">
                <DataRailButton onClick={() => openLeadForm()}>
                  Рассчитать стоимость контактов
                </DataRailButton>
                <DataRailButton variant="secondary" href="#result-example">
                  Посмотреть пример результата
                </DataRailButton>
              </div>
              <div className="hero-trust" aria-label="Подтверждения">
                <span><b aria-hidden="true">✓</b> Резидент «Сколково»</span>
                <i aria-hidden="true" />
                <span><b aria-hidden="true">✓</b> ПО включено в реестр Минцифры</span>
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

        <section className="section logic-section" id="mechanics">
          <div className="section-shell">
            <div className="section-heading logic-heading">
              <span className="eyebrow">Логика продукта</span>
              <h2>Конкуренты вкладываются в рекламу, а их трафиком пользуетесь вы</h2>
              <p>
                Опишите портрет клиента — мы подберём источники, настроим кабинет и передадим контакты вашему отделу продаж.
              </p>
            </div>

            <div className="editorial-steps" data-reveal>
              <div className="editorial-data-line" aria-hidden="true"><span /></div>
              {productSteps.map((step, index) => (
                <article className="editorial-step" key={step.title} style={{ "--step-index": index } as CSSProperties}>
                  <span className="editorial-step-number" aria-hidden="true">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <div className="logic-accent">
              <span>Платите за контакты, а не за показы и клики.</span>
              <DataRailButton variant="secondary" onClick={() => openLeadForm()}>Обсудить вашу аудиторию</DataRailButton>
            </div>
          </div>
        </section>

        <SourcesShowcase />

        <ContactFormatScene onLead={() => openLeadForm()} />

        <ControlLoop />

        <section className="section sphere-preview-section" aria-label="Предварительный просмотр Particle Sphere">
          <div className="section-shell sphere-preview-shell">
            <span className="sphere-preview-caption" aria-hidden="true">Particle sphere · preview</span>
            <div className="sphere-preview-stage">
              <ParticleSphere className="sphere-preview-object" />
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

            <CplCalculator />

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
                <DataRailButton onClick={() => openLeadForm()}>
                  Получить расчёт под свою нишу
                </DataRailButton>
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

      <SiteFooter />
    </div>
  );
}
