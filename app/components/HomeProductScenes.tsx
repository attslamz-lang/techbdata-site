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

      <InteractiveSurface className="browser-surface" aria-label="Сцена посещения сайта и появления контакта">
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

        <div className="browser-data-bridge" aria-hidden="true">
          <motion.i
            variants={{
              idle: { scaleX: 0, opacity: 0 },
              complete: { scaleX: 1, opacity: 1, transition: { duration: 0.24, delay: 0.38, ease: easeOut } },
            }}
          />
          <motion.span
            variants={{
              idle: { x: -28, opacity: 0 },
              complete: { x: 0, opacity: 1, transition: { duration: 0.24, delay: 0.48, ease: easeOut } },
            }}
          >data</motion.span>
        </div>

        <motion.aside
          className="source-result-rail"
          variants={{
            idle: { opacity: 0.28, x: 14 },
            complete: { opacity: 1, x: 0, transition: { duration: 0.28, delay: 0.5, ease: easeOut } },
          }}
        >
          <span>Контакт</span>
          <strong>+7 977 *** 19 01</strong>
          <small>Страница услуги</small>
          <b><i /> Добавлен в кабинет</b>
        </motion.aside>
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
        <p>Фиксируем звонок на выбранный номер и добавляем контакт в кабинет.</p>
      </div>

      <InteractiveSurface className="call-surface" aria-label="Сцена звонка и добавления контакта">
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

        <motion.div
          className="call-contact-slot"
          initial={reducedMotion ? false : { opacity: 0.28, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: reducedMotion ? 0 : 0.58, ease: easeOut }}
        >
          <span>Контакт</span>
          <strong>+7 977 *** 19 01</strong>
          <b><i /> Добавлен в кабинет</b>
        </motion.div>
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
        <p>Учитываем входящие и исходящие SMS по выбранным номерам.</p>
      </div>

      <InteractiveSurface className="sms-surface" aria-label="Сцена SMS-диалога и появления контакта">
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

        <motion.aside
          className="sms-contact-drawer"
          variants={{
            idle: { opacity: 0.2, clipPath: "inset(0 0 0 100%)" },
            complete: { opacity: 1, clipPath: "inset(0 0 0 0%)", transition: { duration: 0.3, delay: 0.56, ease: easeOut } },
          }}
        >
          <span>Новый контакт</span>
          <strong>+7 977 *** 19 01</strong>
          <small>Ответное SMS</small>
          <b><i /> В кабинете</b>
        </motion.aside>
      </InteractiveSurface>
    </motion.article>
  );
}

export function SourcesShowcase() {
  return (
    <section className="section sources-section sources-redesign" id="sources">
      <div className="section-shell">
        <div className="section-heading section-heading-centered source-redesign-heading">
          <span className="eyebrow">Источники контактов</span>
          <h2>Контакты из сайтов, звонков и SMS</h2>
          <p>Клиенты посещают выбранные сайты конкурентов, звонят на их номера или отправляют SMS.</p>
        </div>

        <div className="source-product-stack">
          <SourceBrowserScene />
          <div className="source-product-pair">
            <SourceCallScene />
            <SourceSmsScene />
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
            <span className="eyebrow">Два формата · один кабинет</span>
            <h2>Получайте контакты напрямую или после квалификации</h2>
          </div>
          <p>Переключите формат: базовая карточка остаётся той же, а после звонка колл-центра в ней появляется больше данных.</p>
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
          <DataRailButton onClick={onLead}>Подобрать формат под вашу задачу</DataRailButton>
        </div>
      </div>
    </section>
  );
}

const controlStages = [
  { key: "portrait", label: "Портрет клиента", detail: "Ниша · география · критерии" },
  { key: "sources", label: "Источники", detail: "Сайты · номера · SMS" },
  { key: "contacts", label: "Первые контакты", detail: "Поступают в отдел продаж" },
  { key: "feedback", label: "Обратная связь", detail: "Продажи отмечают качество" },
  { key: "adjustment", label: "Корректировка", detail: "Слабые меняем, сильные оставляем" },
];

export function ControlLoop() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section control-loop-section" id="quality">
      <span className="section-anchor" id="launch" aria-hidden="true" />
      <div className="section-shell">
        <div className="control-loop-heading">
          <div>
            <span className="eyebrow">Запуск и контроль качества</span>
            <h2>Настройка продолжается после первых контактов</h2>
          </div>
          <p>Вы описываете портрет клиента. Мы настраиваем источники, запускаем получение контактов и смотрим обратную связь отдела продаж. Если источник даёт слабый результат — меняем настройки и перераспределяем работу.</p>
        </div>

        <InteractiveSurface className="control-loop-surface" aria-label="Цикл настройки и контроля источников">
          <svg className="control-loop-paths" viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>
            <motion.path
              className="control-path-main"
              d="M 70 98 C 230 98, 270 98, 430 98 S 720 98, 930 98"
              initial={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.28 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reducedMotion ? 0 : 0.78, ease: easeOut }}
              markerEnd="url(#loop-arrow)"
            />
            <motion.path
              className="control-path-feedback"
              d="M 930 150 C 820 235, 430 235, 270 152"
              initial={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.72, ease: easeOut }}
              markerEnd="url(#loop-arrow)"
            />
          </svg>

          <div className="control-loop-stages">
            {controlStages.map((stage, index) => (
              <motion.div
                className={`control-stage control-stage-${stage.key}`}
                key={stage.key}
                initial={reducedMotion ? false : { opacity: 0.48, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: reducedMotion ? 0 : 0.26, delay: reducedMotion ? 0 : 0.08 + index * 0.08, ease: easeOut }}
              >
                <span>{stage.label}</span>
                <strong>{stage.detail}</strong>
                {stage.key === "sources" && (
                  <div className="control-source-states">
                    <motion.i initial={false} whileInView={{ scale: reducedMotion ? 1 : [1, 1.04, 1] }} viewport={{ once: true }} transition={{ duration: 0.32, delay: 1.24 }}>Активен</motion.i>
                    <i>Проверяем</i>
                    <motion.i initial={false} whileInView={{ opacity: reducedMotion ? 0.48 : [1, 0.48] }} viewport={{ once: true }} transition={{ duration: 0.28, delay: 1.28 }}>Отключён</motion.i>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="control-loop-feedback-note"
            initial={reducedMotion ? false : { opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : 1.02, ease: easeOut }}
          >
            Обратная связь возвращается к источникам
          </motion.div>
        </InteractiveSurface>
      </div>
    </section>
  );
}
