import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export default function ContactsPage() {
  return (
    <main className="inner-page">
      <SiteHeader current="contacts" />
      <section className="inner-hero section-grid">
        <div className="page-wrap">
          <p className="eyebrow"><span /> КОНТАКТЫ</p>
          <h1>Обсудим вашу <em>задачу.</em></h1>
          <p className="inner-lead">На финальной странице здесь будут рабочие контакты, форма заявки и карта. Для прототипа оставляем понятную композицию без неподтверждённых данных.</p>
        </div>
      </section>
      <section className="page-wrap contacts-content">
        <div className="contact-route"><span>01</span><p>Коротко описываете нишу, регион и цель.</p></div>
        <div className="contact-route"><span>02</span><p>Мы готовим сценарий разговора и предварительный расчёт.</p></div>
        <div className="contact-route"><span>03</span><p>Обсуждаем возможный формат запуска.</p></div>
        <div className="contacts-action">
          <p>НУЖНЫ ТАРИФЫ?</p>
          <Link href="/#tariffs" className="button button-primary">Перейти к тарифам <span>↗</span></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
