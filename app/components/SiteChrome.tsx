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
          <Link href="/solutions" className={current === "solutions" ? "nav-case-active" : ""} aria-current={current === "solutions" ? "page" : undefined}>Решения</Link>
          <Link href="/company" className={current === "company" ? "nav-case-active" : ""} aria-current={current === "company" ? "page" : undefined}>О компании</Link>
          <a href="/#tariffs">Тарифы</a>
          <Link href="/cases" className={current === "cases" ? "nav-case-active" : ""} aria-current={current === "cases" ? "page" : undefined}>Кейсы</Link>
          <Link href="/contacts" className={current === "contacts" ? "nav-case-active" : ""} aria-current={current === "contacts" ? "page" : undefined}>Контакты</Link>
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
        <span>Прототип структуры и визуального направления</span>
        <div className="footer-links">
          <Link href="/solutions">Решения</Link>
          <a href="/#tariffs">Тарифы</a>
          <Link href="/cases">Кейсы</Link>
          <Link href="/contacts">Контакты</Link>
        </div>
      </div>
    </footer>
  );
}
