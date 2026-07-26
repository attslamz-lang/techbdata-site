import Link from "next/link";

type SiteHeaderProps = {
  current?: "solutions" | "company" | "cases" | "contacts";
};

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="page-wrap header-inner">
        <Link className="brand" href="/" aria-label="techbdata — на главную">
          techbdata
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <a href="/#mechanics">Как работает</a>
          <Link href="/solutions" className={current === "solutions" ? "nav-case-active" : ""} aria-current={current === "solutions" ? "page" : undefined}>Решения</Link>
          <a href="/#tariffs">Тарифы</a>
          <Link href="/cases" className={current === "cases" ? "nav-case-active" : ""} aria-current={current === "cases" ? "page" : undefined}>Кейсы</Link>
        </nav>
        <a className="header-cta" href="/#contact">Получить расчёт</a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-inner">
        <Link href="/" className="footer-brand">techbdata</Link>
        <span>Контакты с уже сформированным спросом для вашего отдела продаж</span>
        <div className="footer-links">
          <a href="/#mechanics">Как работает</a>
          <Link href="/solutions">Решения</Link>
          <a href="/#tariffs">Тарифы</a>
          <Link href="/cases">Кейсы</Link>
          <Link href="/contacts">Контакты</Link>
        </div>
      </div>
    </footer>
  );
}
