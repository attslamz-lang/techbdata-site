import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const features = [
  {
    number: "01",
    title: "Целевой спрос",
    text: "Определяем цифровые сигналы аудитории, которой уже интересна ваша категория.",
  },
  {
    number: "02",
    title: "Настройка под нишу",
    text: "Собираем сценарий работы с учётом региона, конкуренции и возможностей отдела продаж.",
  },
  {
    number: "03",
    title: "Понятная передача",
    text: "Готовим поток контактов и правила обработки, чтобы менеджеры могли включиться без паузы.",
  },
];

const tariffs = [
  {
    name: "Пилот",
    caption: "Проверить гипотезу",
    detail: "Запуск для одной ниши или региона",
    accent: false,
  },
  {
    name: "Рост",
    caption: "Получать лиды регулярно",
    detail: "Настроенный поток и сопровождение",
    accent: true,
  },
  {
    name: "Индивидуальный",
    caption: "Масштабировать продажи",
    detail: "Конфигурация под вашу задачу",
    accent: false,
  },
];

const placeholders = [
  "B2B-услуги",
  "Недвижимость",
  "Медицинские услуги",
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero section-grid" id="about">
        <div className="page-wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span /> СИСТЕМА РОСТА ПРОДАЖ</p>
            <h1>
              Целевые контакты для отдела продаж <em>из спроса</em> вашей ниши.
            </h1>
            <p className="hero-description">
              techbdata помогает бизнесу выстраивать дополнительный канал привлечения клиентов. Логику и цифры для вашей ниши покажем в персональном расчёте.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Получить расчёт <span>↗</span></a>
              <a className="text-link" href="#how">Как это работает <span>↓</span></a>
            </div>
            <div className="trust-row" aria-label="Ключевые преимущества">
              <span>Резидент Сколково</span>
              <span>Реестр Минцифры</span>
              <span>CRM</span>
              <span>Персональное сопровождение</span>
            </div>
          </div>

          <div className="signal-stage" aria-label="Схема движения целевого спроса">
            <div className="stage-topline">
              <span className="status-dot" />
              <span>DATA FLOW / 01</span>
              <span>ONLINE</span>
            </div>
            <div className="stage-orbit orbit-one" />
            <div className="stage-orbit orbit-two" />
            <div className="signal-point point-one"><i /> 01</div>
            <div className="signal-point point-two"><i /> 02</div>
            <div className="signal-point point-three"><i /> 03</div>
            <div className="stage-card main-stage-card">
              <span className="card-kicker">СИГНАЛ СПРОСА</span>
              <strong>Ваша категория</strong>
              <p>Настраиваем маршрут от интереса к работе менеджера.</p>
            </div>
            <div className="stage-card mini-stage-card">
              <span className="mini-arrow">↘</span>
              <span>Контакты</span>
              <b>→ CRM</b>
            </div>
            <div className="stage-flow flow-intent"><span /> <b>INTENT</b><em>74%</em></div>
            <div className="stage-flow flow-qualify"><span /> <b>QUALIFIED</b><em>42</em></div>
            <div className="stage-rail"><span>входящий спрос</span><b>+18.4%</b></div>
            <div className="stage-caption">Технология без визуального шума</div>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <div className="page-wrap intro-strip-grid">
          <p>Не услуга «для всех», а понятная система: <b>разобраться в спросе → передать в продажи → улучшать результат.</b></p>
          <a href="#how" className="round-arrow" aria-label="Перейти к этапам работы">↓</a>
        </div>
      </section>

      <section className="section page-wrap" id="solutions">
        <div className="section-heading compact-heading">
          <p className="eyebrow"><span /> ЧТО ПОЛУЧАЕТ БИЗНЕС</p>
          <h2>Собираем путь <em>от интереса</em> до звонка менеджера.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
              <span className="feature-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section" id="how">
        <div className="page-wrap">
          <div className="section-heading inverted-heading">
            <p className="eyebrow"><span /> КАК МЫ РАБОТАЕМ</p>
            <h2>Три шага до <em>понятного запуска.</em></h2>
          </div>
          <div className="workflow-grid">
            <article>
              <span>01</span>
              <h3>Короткий бриф</h3>
              <p>Уточняем нишу, географию, текущую воронку и объём, который готов обработать отдел продаж.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Проектируем сценарий</h3>
              <p>Определяем состав решения, формат передачи данных и точки контроля результата.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Запускаем и улучшаем</h3>
              <p>Передаём поток в работу и корректируем настройки на основе обратной связи от бизнеса.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section page-wrap economics-section">
        <div className="economics-copy">
          <p className="eyebrow"><span /> ЭКОНОМИКА ПРОЕКТА</p>
          <h2>Сначала считаем, <em>потом предлагаем.</em></h2>
          <p>На следующем этапе здесь появится калькулятор. Пока оставляем его место и логику: он будет показывать сценарий запуска по данным вашего бизнеса, а не обещать универсальную цифру.</p>
        </div>
        <div className="economics-board">
          <div className="board-line"><span>01</span><p>Стоимость текущего лида</p><b>ваши данные</b></div>
          <div className="board-line"><span>02</span><p>Ресурс отдела продаж</p><b>ваши данные</b></div>
          <div className="board-line total"><span>03</span><p>Сценарий запуска</p><b>индивидуальный расчёт ↗</b></div>
        </div>
      </section>

      <section className="case-preview section-grid" id="cases">
        <div className="page-wrap">
          <div className="section-heading case-heading">
            <div>
              <p className="eyebrow"><span /> ПРАКТИКА</p>
              <h2>Результаты — <em>в цифрах.</em></h2>
            </div>
            <Link href="/cases" className="button button-outline">Больше кейсов <span>↗</span></Link>
          </div>
          <div className="case-grid">
            {placeholders.map((title, index) => (
              <article className="case-card" key={title}>
                <div className="case-image-placeholder"><span>CASE / 0{index + 1}</span><i /></div>
                <p className="case-status">В ПОДГОТОВКЕ</p>
                <h3>{title}</h3>
                <p>Здесь появятся задача, конфигурация решения и подтверждённый результат проекта.</p>
                <Link href="/cases" className="card-link">Смотреть структуру кейса <span>→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tariff-section" id="tariffs">
        <div className="page-wrap">
          <div className="section-heading tariff-heading">
            <p className="eyebrow"><span /> ТАРИФЫ</p>
            <h2>Выберите формат <em>старта.</em></h2>
            <p>Наполнение и точную стоимость уточним после согласования модели работы. Сейчас фиксируем подачу раздела.</p>
          </div>
          <div className="tariff-grid">
            {tariffs.map((tariff) => (
              <article className={`tariff-card ${tariff.accent ? "tariff-card-accent" : ""}`} key={tariff.name}>
                <span className="tariff-marker">{tariff.accent ? "РЕКОМЕНДУЕМ" : "ФОРМАТ РАБОТЫ"}</span>
                <h3>{tariff.name}</h3>
                <p className="tariff-caption">{tariff.caption}</p>
                <div className="tariff-divider" />
                <p className="tariff-detail">{tariff.detail}</p>
                <a href="#contact" className="tariff-link">Обсудить условия <span>↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="page-wrap contact-layout">
          <div>
            <p className="eyebrow"><span /> СЛЕДУЮЩИЙ ШАГ</p>
            <h2>Посмотрим, где ваш бизнес может <em>получать больше клиентов.</em></h2>
          </div>
          <div className="contact-panel">
            <p>Прототип формы</p>
            <div className="fake-input">Ваше имя</div>
            <div className="fake-input">Телефон для связи</div>
            <button type="button" className="button button-primary">Получить расчёт <span>↗</span></button>
            <small>На следующем этапе подключим отправку заявок и юридические тексты.</small>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
