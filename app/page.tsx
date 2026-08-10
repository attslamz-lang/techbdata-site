"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { ContactFormatScene, HowItWorksSection } from "./components/HomeProductScenes";
import { MeshDriftBackground } from "./components/MeshDriftBackground";
import { DataRailButton } from "./components/MotionPrimitives";
import { ParticleSphere } from "./components/ParticleSphere";
import { LeadForm, SiteFooter, SiteHeader, openLeadForm } from "./components/SiteChrome";

const faqs = [
  {
    question: "Откуда берутся контакты и как обрабатываются данные?",
    answer:
      "Контакты появляются после зафиксированных посещений выбранных сайтов, звонков и SMS по согласованным источникам. Конкретный сценарий и вопросы обработки данных уточняем до запуска проекта; политика обработки персональных данных опубликована внизу страницы.",
  },
  {
    question: "Чем techbdata отличается от базы, парсера и обычной рекламы?",
    answer:
      "Это не готовый статичный список: источники настраиваются под портрет вашего клиента, а контакты появляются после конкретных действий. В отличие от обычной рекламы, вы платите за переданные контакты, а не за показы и клики.",
  },
  {
    question: "Что получает менеджер и чем отличаются форматы?",
    answer:
      "Без обзвона менеджер получает телефон, источник, совершённое действие и дату. После квалификации к карточке добавляются задача, готовность к разговору, комментарий оператора и запись разговора.",
  },
  {
    question: "Сколько стоит запуск и что требуется от клиента?",
    answer:
      "Для старта нужны портрет клиента, география и, если есть, список конкурентов. Контакты без обзвона стоят 40–60 ₽, после квалификации — 70–110 ₽; точный расчёт зависит от аудитории, источников, объёма и критериев квалификации.",
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
              <h1 aria-label="Получайте контакты клиентов ваших конкурентов">
                <span>Получайте контакты клиентов</span>
                <span>ваших конкурентов</span>
              </h1>
              <p className="hero-description">
                Получаем контакты после посещений выбранных сайтов, звонков и SMS. Передаём менеджерам напрямую или после квалификации.
              </p>
              <div className="hero-actions">
                <DataRailButton onClick={() => openLeadForm()}>
                  Получить расчёт
                </DataRailButton>
                <a className="hero-result-link" href="#result-example">
                  Смотреть пример контакта <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="hero-trust" aria-label="Подтверждения">
                <span><b aria-hidden="true">✓</b> Резидент «Сколково»</span>
                <i aria-hidden="true" />
                <span><b aria-hidden="true">✓</b> ПО включено в реестр Минцифры</span>
              </div>
            </div>

            <div className="hero-sphere-layer" aria-hidden="true">
              <ParticleSphere className="hero-particle-sphere" />
            </div>

            <div className="hero-visual-composition">
              <div className="hero-product-scene" aria-label="Пример нового контакта в techbdata">
                <div className="hero-scene-bar">
                  <div className="hero-scene-title">
                    <span>techbdata</span>
                    <strong>Новый контакт</strong>
                  </div>
                  <span className="live-state"><i /> Активно</span>
                </div>

                <div className="hero-contact-panel">
                  <div className="hero-contact-source hero-product-row">
                    <span className="hero-source-mark" aria-hidden="true"><i /></span>
                    <div>
                      <span className="hero-ui-label">Источник</span>
                      <strong>Сайт конкурента</strong>
                      <small>Раздел услуги</small>
                    </div>
                  </div>

                  <div className="hero-contact-event hero-product-row">
                    <span className="hero-ui-label">Событие</span>
                    <strong>Посетил выбранную страницу</strong>
                    <small>Сегодня · 12:40</small>
                  </div>

                  <div className="hero-contact-record hero-product-row">
                    <div className="contact-avatar">А</div>
                    <div className="hero-contact-number">
                      <span className="hero-ui-label">Контакт</span>
                      <strong>+7 977 *** 19 01</strong>
                    </div>
                    <span className="hero-contact-status"><i aria-hidden="true">✓</i> Передан в отдел продаж</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactFormatScene onLead={() => openLeadForm()} />

        <HowItWorksSection />

        <section className="section trust-quality-section" id="quality">
          <div className="section-shell trust-quality-shell">
            <div className="trust-quality-copy">
              <span className="eyebrow">Доверие и качество</span>
              <h2>Источники остаются под контролем</h2>
              <p>
                Вы описываете портрет клиента. Мы настраиваем источники и смотрим обратную связь отдела продаж. Слабые источники отключаем или корректируем.
              </p>
            </div>

            <div className="trust-proof-list" aria-label="Подтверждения и реквизиты">
              <div><span>Статус</span><strong>Резидент «Сколково»</strong></div>
              <div><span>Продукт</span><strong>ПО включено в реестр Минцифры</strong></div>
              <div>
                <span>Компания</span>
                <strong>ИП ПЕТРОВ СТАНИСЛАВ СЕРГЕЕВИЧ</strong>
                <small>ИНН 211485388853 · ОГРНИП 322213000040850</small>
              </div>
            </div>

            <p className="trust-data-note">
              Контакты появляются после действий по согласованным сайтам и номерам. Конкретный сценарий и вопросы обработки данных уточняем до запуска проекта.
            </p>
          </div>
        </section>

        <section className="section pricing-section" id="tariffs">
          <div className="section-shell">
            <div className="section-heading pricing-heading">
              <span className="eyebrow">Стоимость</span>
              <h2>Стоимость контактов</h2>
              <p>
                Точный расчёт зависит от аудитории, источников, объёма и критериев квалификации.
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
                <DataRailButton onClick={() => openLeadForm()}>
                  Получить расчёт
                </DataRailButton>
              </div>
            </div>

            <div className="cpl-secondary-heading">
              <span>Сравнение</span>
              <h3>Хотите сравнить с текущим CPL?</h3>
              <p>Укажите стоимость лида в вашем бизнесе — калькулятор покажет ориентир для сравнения.</p>
            </div>
            <CplCalculator />
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-shell faq-shell">
            <div className="faq-heading">
              <span className="eyebrow">FAQ</span>
              <h2>Вопросы о продукте</h2>
              <p>Коротко о данных, форматах, стоимости и запуске.</p>
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
