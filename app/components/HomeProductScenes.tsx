"use client";

import { type CSSProperties, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { DataRailButton, InteractiveSurface } from "./MotionPrimitives";

const qualifiedDetails = [
  "Объект около 4 000 м²",
  "Сравнивает несколько подрядчиков",
  "Требуется предварительный расчёт",
  "Готов принять звонок завтра после 14:00",
];

const easeOut = [0.22, 0.78, 0.24, 1] as const;

function SourceBrowserScene() {
  const reducedMotion = useReducedMotion();
  const startState = reducedMotion ? "complete" : "idle";

  return (
    <motion.article
      className="source-product source-browser-product"
      initial={startState}
      whileInView="complete"
      viewport={{ once: true, amount: 0.34 }}
      variants={{
        idle: { opacity: 0.72, y: 18 },
        complete: { opacity: 1, y: 0, transition: { duration: 0.34, ease: easeOut, staggerChildren: 0.11 } },
      }}
    >
      <div className="source-product-copy">
        <span className="source-product-index">Сайт</span>
        <h3>Посещение выбранной страницы</h3>
        <p>Клиент открывает сайт конкурента и изучает конкретную услугу.</p>
      </div>

      <InteractiveSurface className="browser-surface" aria-label="Сцена посещения выбранной страницы">
        <motion.div
          className="browser-product-window interactive-surface-layer"
          variants={{ idle: { opacity: 0.78, x: -8 }, complete: { opacity: 1, x: 0, transition: { duration: 0.26 } } }}
        >
          <div className="browser-product-bar">
            <span className="browser-controls"><i /><i /><i /></span>
            <span className="browser-url">security-example.ru / видеонаблюдение</span>
            <span>HTTPS</span>
          </div>
          <div className="browser-product-content">
            <div className="browser-product-nav"><b>SECURITY</b><span>Решения</span><span>Проекты</span><span>Контакты</span></div>
            <div className="browser-product-hero">
              <span>Для коммерческих объектов</span>
              <strong>Видеонаблюдение<br />для бизнеса</strong>
              <small>Проектирование и предварительный расчёт</small>
              <motion.div
                className="browser-focus-zone"
                variants={{
                  idle: { opacity: 0, scale: 0.94 },
                  complete: { opacity: 1, scale: 1, transition: { duration: 0.22, delay: 0.2 } },
                }}
              >
                Рассчитать решение
              </motion.div>
            </div>
          </div>
        </motion.div>

      </InteractiveSurface>
    </motion.article>
  );
}

function SourceCallScene() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="source-product source-call-product"
      initial={reducedMotion ? "complete" : "idle"}
      whileInView="complete"
      viewport={{ once: true, amount: 0.42 }}
      variants={{
        idle: { opacity: 0.7, y: 16 },
        complete: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
      }}
    >
      <div className="source-product-copy">
        <span className="source-product-index">Звонок</span>
        <h3>Звонок на номер конкурента</h3>
        <p>Клиент звонит на выбранный номер конкурента.</p>
      </div>

      <InteractiveSurface className="call-surface" aria-label="Сцена звонка на выбранный номер">
        <div className="call-connection interactive-surface-layer">
          <div className="call-number-block">
            <span>Выбранный номер</span>
            <strong>+7 495 120-**-42</strong>
            <motion.b
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0.45 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.18, delay: 0.18 }}
            ><i /> Соединение</motion.b>
          </div>
          <div className="call-ring" aria-hidden="true">
            <motion.i
              initial={reducedMotion ? false : { scale: 0.7, opacity: 0 }}
              whileInView={reducedMotion ? undefined : { scale: [0.7, 1.35], opacity: [0, 0.5, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: 0.18, ease: "easeOut" }}
            />
            <span>☎</span>
          </div>
        </div>

        <div className="call-waveform" aria-label="Короткий фрагмент голосового сигнала">
          {[0.35, 0.62, 0.9, 0.55, 1, 0.72, 0.42, 0.84, 0.58, 0.34, 0.68, 0.48].map((height, index) => (
            <motion.i
              key={`${height}-${index}`}
              style={{ height: `${Math.round(12 + height * 38)}px` } as CSSProperties}
              initial={reducedMotion ? false : { scaleY: 0.25, opacity: 0.32 }}
              whileInView={reducedMotion ? undefined : { scaleY: [0.25, 1.18, 1], opacity: [0.32, 1, 0.72] }}
              viewport={{ once: true }}
              transition={{ duration: 0.34, delay: 0.24 + index * 0.025, ease: "easeOut" }}
            />
          ))}
        </div>

      </InteractiveSurface>
    </motion.article>
  );
}

function SourceSmsScene() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="source-product source-sms-product"
      initial={reducedMotion ? "complete" : "idle"}
      whileInView="complete"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        idle: { opacity: 0.7, y: 16 },
        complete: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
      }}
    >
      <div className="source-product-copy">
        <span className="source-product-index">SMS</span>
        <h3>Диалог по выбранному номеру</h3>
        <p>Входящее или исходящее SMS по выбранному номеру.</p>
      </div>

      <InteractiveSurface className="sms-surface" aria-label="Сцена SMS-диалога по выбранному номеру">
        <div className="sms-dialogue">
          <div className="sms-number"><span>Диалог</span><strong>+7 495 120-**-42</strong></div>
          <motion.div
            className="sms-bubble sms-bubble-out"
            variants={{ idle: { opacity: 0.45, x: -10 }, complete: { opacity: 1, x: 0, transition: { duration: 0.22 } } }}
          >Подскажите стоимость и условия</motion.div>
          <motion.div
            className="sms-bubble sms-bubble-in"
            variants={{
              idle: { opacity: 0, scale: 0.84, x: 12 },
              complete: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 420, damping: 27, delay: 0.24 } },
            }}
          >Да, подготовим расчёт. Уточните площадь объекта.</motion.div>
          <motion.div
            className="sms-event-chip"
            variants={{ idle: { opacity: 0, y: 8 }, complete: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.48 } } }}
          ><i /> Ответ получен</motion.div>
        </div>

      </InteractiveSurface>
    </motion.article>
  );
}

const howSteps = [
  {
    title: "Согласовываем портрет и источники",
    text: "Вы описываете портрет клиента, географию и критерии. Вместе выбираем сайты, номера и SMS-источники.",
  },
  {
    title: "Фиксируем нужные действия",
    text: "Учитываем посещение выбранной страницы, звонок или SMS по согласованному источнику.",
  },
  {
    title: "Передаём контакт менеджеру",
    text: "Контакт поступает напрямую в отдел продаж или сначала проходит квалификацию.",
  },
];

const sourceTabs = [
  { key: "site", label: "Сайт", Scene: SourceBrowserScene },
  { key: "call", label: "Звонок", Scene: SourceCallScene },
  { key: "sms", label: "SMS", Scene: SourceSmsScene },
] as const;

export function HowItWorksSection() {
  const [source, setSource] = useState<(typeof sourceTabs)[number]["key"]>("site");
  const reducedMotion = useReducedMotion();
  const activeSource = sourceTabs.find((item) => item.key === source) ?? sourceTabs[0];
  const ActiveScene = activeSource.Scene;

  return (
    <section className="section how-section" id="mechanics">
      <div className="section-shell">
        <div className="section-heading how-heading">
          <span className="eyebrow">Механика</span>
          <h2>Как это работает</h2>
          <p>Один короткий путь от согласованного действия до контакта в отделе продаж.</p>
        </div>

        <div className="editorial-steps how-steps" data-reveal>
          <div className="editorial-data-line" aria-hidden="true"><span /></div>
          {howSteps.map((step, index) => (
            <article className="editorial-step" key={step.title} style={{ "--step-index": index } as CSSProperties}>
              <span className="editorial-step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="source-switcher" data-reveal>
          <div className="source-switcher-heading">
            <div>
              <span>Источники</span>
              <h3>Сайт, звонок или SMS</h3>
            </div>
            <div className="source-tabs" role="tablist" aria-label="Источник контакта">
              {sourceTabs.map((item) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={source === item.key}
                  aria-controls="source-live-panel"
                  key={item.key}
                  onClick={() => setSource(item.key)}
                >
                  {source === item.key && (
                    <motion.span
                      className="source-tab-active"
                      layoutId="source-tab"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="source-live-panel" id="source-live-panel" role="tabpanel">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                className="source-switch-scene"
                key={source}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reducedMotion ? 0 : 0.24, ease: easeOut }}
              >
                <ActiveScene />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactFormatSceneProps = {
  onLead: () => void;
};

export function ContactFormatScene({ onLead }: ContactFormatSceneProps) {
  const [mode, setMode] = useState<"direct" | "qualified">("qualified");
  const reducedMotion = useReducedMotion();
  const qualified = mode === "qualified";

  return (
    <section className="section contact-format-section" id="result-example">
      <span className="section-anchor" id="formats" aria-hidden="true" />
      <div className="section-shell">
        <div className="section-heading section-heading-split contact-format-heading">
          <div>
            <span className="eyebrow">Результат</span>
            <h2>Что получает менеджер</h2>
          </div>
          <p>Без обзвона — контакт и исходные данные. После квалификации — задача, готовность к разговору, комментарий и запись.</p>
        </div>

        <InteractiveSurface className={`contact-live-surface ${qualified ? "is-qualified" : "is-direct"}`}>
          <LayoutGroup id="contact-format">
            <div className="contact-format-tabs" role="tablist" aria-label="Формат контакта">
              {(["direct", "qualified"] as const).map((tab) => {
                const active = mode === tab;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="contact-live-panel"
                    key={tab}
                    onClick={() => setMode(tab)}
                  >
                    {active && <motion.span className="contact-tab-active" layoutId="contact-tab" transition={{ type: "spring", stiffness: 440, damping: 34 }} />}
                    <span>{tab === "direct" ? "Без обзвона" : "После квалификации"}</span>
                  </button>
                );
              })}
            </div>

            <motion.div
              className="contact-live-card interactive-surface-layer"
              id="contact-live-panel"
              role="tabpanel"
              layout
              transition={{ layout: reducedMotion ? { duration: 0 } : { duration: 0.34, ease: easeOut } }}
            >
              <motion.div className="contact-live-base" layout="position">
                <div className="contact-live-topbar">
                  <div><span>Обращение</span><strong>{qualified ? "Алексей · +7 977 *** 19 01" : "+7 977 *** 19 01"}</strong></div>
                  <motion.b layout className={qualified ? "is-qualified" : "is-direct"}>
                    <i /> {qualified ? "Квалификация завершена" : "Добавлен в кабинет"}
                  </motion.b>
                </div>
                <div className="contact-live-fields">
                  <div><span>Источник</span><strong>Сайт интегратора систем безопасности</strong></div>
                  <div><span>Совершённое действие</span><strong>Посещение страницы «Видеонаблюдение для бизнеса»</strong></div>
                  <div><span>Дата</span><strong>Сегодня, 12:40</strong></div>
                </div>
                <p className="contact-format-human-copy">
                  {qualified ? "Менеджер видит задачу, готовность к разговору и материалы квалификации." : "Менеджер получает номер и сам звонит клиенту."}
                </p>

                <AnimatePresence initial={false}>
                  {qualified && (
                    <motion.div
                      className="contact-qualified-fields"
                      initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 0 18% 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                      exit={{ opacity: 0, clipPath: "inset(0 0 22% 0)" }}
                      transition={{ duration: reducedMotion ? 0 : 0.3, ease: easeOut }}
                    >
                      <div className="contact-task"><span>Задача</span><strong>Система видеонаблюдения для производственного объекта</strong></div>
                      <ul>
                        {qualifiedDetails.map((detail, index) => (
                          <motion.li
                            key={detail}
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.22, delay: reducedMotion ? 0 : 0.07 + index * 0.04 }}
                          >{detail}</motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence initial={false} mode="popLayout">
                {qualified && (
                  <motion.aside
                    className="contact-operator-panel"
                    key="operator"
                    initial={reducedMotion ? false : { opacity: 0, x: 20, clipPath: "inset(0 0 0 18%)" }}
                    animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }}
                    exit={{ opacity: 0, x: 12, clipPath: "inset(0 0 0 20%)" }}
                    transition={{ duration: reducedMotion ? 0 : 0.32, ease: easeOut }}
                  >
                    <div className="contact-operator-heading"><span>Комментарий оператора</span><b>Запись разговора · 04:18</b></div>
                    <p>«Алексей отвечает за выбор подрядчика. Компания собирает предложения на установку системы видеонаблюдения для производственного объекта площадью около 4 000 м². Необходимо рассчитать размещение камер внутри помещений и по периметру территории. Рассматривает несколько компаний, окончательное решение пока не принято. Готов обсудить задачу с техническим специалистом завтра после 14:00. Просил предварительно подготовить ориентировочный список вопросов для расчёта.»</p>
                  </motion.aside>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </InteractiveSurface>

        <div className="contact-format-action">
          <DataRailButton onClick={onLead}>Подобрать формат</DataRailButton>
        </div>
      </div>
    </section>
  );
}
