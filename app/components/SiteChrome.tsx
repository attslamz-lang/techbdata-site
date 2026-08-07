"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

type SiteHeaderProps = {
  current?: "solutions" | "company" | "cases" | "contacts";
};

type LeadFormProps = {
  className?: string;
  compact?: boolean;
};

type FormErrors = {
  name?: string;
  phone?: string;
};

const OPEN_LEAD_FORM_EVENT = "techbdata:open-lead-form";
const POLICY_URL = "https://techbdata.ru/politic3.pdf";

export function openLeadForm() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_LEAD_FORM_EVENT));
  }
}

function validateLead(name: string, phone: string): FormErrors {
  const errors: FormErrors = {};
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.trim().length < 2) {
    errors.name = "Укажите имя — минимум два символа.";
  }

  if (!/^[+\d\s()-]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Укажите корректный номер телефона.";
  }

  return errors;
}

function isPhoneValid(phone: string) {
  const phoneDigits = phone.replace(/\D/g, "");
  return /^[+\d\s()-]+$/.test(phone) && phoneDigits.length >= 10 && phoneDigits.length <= 15;
}

function ConsentNote() {
  return (
    <p className="form-consent">
      Нажимая кнопку, вы соглашаетесь на{" "}
      <a href={POLICY_URL} target="_blank" rel="noreferrer">обработку персональных данных</a>
      {" "}и принимаете{" "}
      <a href={POLICY_URL} target="_blank" rel="noreferrer">Политику конфиденциальности</a>.
    </p>
  );
}

export function LeadForm({ className = "", compact = false }: LeadFormProps) {
  const fieldId = useId();
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const nextErrors = validateLead(name, phone);

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      const firstInvalidName = nextErrors.name ? "name" : "phone";
      form.querySelector<HTMLInputElement>(`[name="${firstInvalidName}"]`)?.focus();
      return;
    }

    const payload = new URLSearchParams();
    formData.forEach((value, key) => payload.append(key, String(value)));
    setSubmitState("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error(`Form request failed with ${response.status}`);
      }

      form.reset();
      setErrors({});
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  function clearError(field: keyof FormErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitState !== "sending") {
      setSubmitState("idle");
    }
  }

  return (
    <form
      className={`lead-form${compact ? " lead-form-compact" : ""}${className ? ` ${className}` : ""}`}
      name="techbdata-lead"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="techbdata-lead" />
      <p className="lead-honeypot" aria-hidden="true">
        <label>
          Не заполняйте это поле
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="lead-field">
        <label htmlFor={`${fieldId}-name`}>Имя</label>
        <input
          id={`${fieldId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ваше имя"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
          onChange={() => clearError("name")}
          required
        />
        {errors.name && <span className="lead-error" id={`${fieldId}-name-error`}>{errors.name}</span>}
      </div>

      <div className="lead-field">
        <label htmlFor={`${fieldId}-phone`}>Номер телефона</label>
        <input
          id={`${fieldId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${fieldId}-phone-error` : undefined}
          onChange={() => clearError("phone")}
          required
        />
        {errors.phone && <span className="lead-error" id={`${fieldId}-phone-error`}>{errors.phone}</span>}
      </div>

      <button className="lead-submit" type="submit" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Отправляем…" : "Получить расчёт"}
      </button>

      <ConsentNote />

      <div className={`lead-status lead-status-${submitState}`} aria-live="polite" aria-atomic="true">
        {submitState === "success" && "Заявка отправлена. Мы свяжемся с вами."}
        {submitState === "error" && "Не удалось отправить заявку. Проверьте соединение и попробуйте снова."}
      </div>
    </form>
  );
}

function CallbackWidget() {
  const phoneId = useId();
  const [expanded, setExpanded] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    let timer: number | undefined;

    try {
      if (sessionStorage.getItem("techbdata-callback-auto-shown") === "1") return;

      const storedStartedAt = Number(sessionStorage.getItem("techbdata-callback-started-at"));
      const startedAt = Number.isFinite(storedStartedAt) && storedStartedAt > 0 ? storedStartedAt : Date.now();
      sessionStorage.setItem("techbdata-callback-started-at", String(startedAt));
      const remaining = Math.max(0, 30_000 - (Date.now() - startedAt));

      timer = window.setTimeout(() => {
        setExpanded(true);
        sessionStorage.setItem("techbdata-callback-auto-shown", "1");
      }, remaining);
    } catch {
      timer = window.setTimeout(() => setExpanded(true), 30_000);
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  function closeCard() {
    setExpanded(false);
    try {
      sessionStorage.setItem("techbdata-callback-auto-shown", "1");
    } catch {
      // The compact trigger remains available when storage is unavailable.
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") ?? "");

    if (!isPhoneValid(phone)) {
      setPhoneError("Укажите корректный номер телефона.");
      setSubmitState("idle");
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }

    const payload = new URLSearchParams();
    formData.forEach((value, key) => payload.append(key, String(value)));
    setSubmitState("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      if (!response.ok) throw new Error(`Form request failed with ${response.status}`);

      form.reset();
      setPhoneError("");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <aside className={`callback-widget${expanded ? " is-expanded" : ""}`} aria-label="Заказать обратный звонок">
      {expanded && (
        <div className="callback-card">
          <button className="callback-close" type="button" onClick={closeCard} aria-label="Закрыть форму обратного звонка">×</button>
          <strong>Оставьте номер — мы перезвоним</strong>
          <form
            name="techbdata-callback"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            noValidate
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="techbdata-callback" />
            <input type="hidden" name="source" value="callback-widget" />
            <input type="hidden" name="type" value="callback" />
            <p className="lead-honeypot" aria-hidden="true">
              <label>Не заполняйте это поле<input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <label htmlFor={phoneId}>Телефон</label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 900 000-00-00"
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? `${phoneId}-error` : undefined}
              onChange={() => {
                setPhoneError("");
                if (submitState !== "sending") setSubmitState("idle");
              }}
              required
            />
            {phoneError && <span className="lead-error" id={`${phoneId}-error`}>{phoneError}</span>}
            <button type="submit" disabled={submitState === "sending"}>
              {submitState === "sending" ? "Отправляем…" : "Заказать звонок"}
            </button>
            <div className={`lead-status lead-status-${submitState}`} aria-live="polite" aria-atomic="true">
              {submitState === "success" && "Заявка отправлена. Мы перезвоним вам."}
              {submitState === "error" && "Не удалось отправить заявку. Попробуйте ещё раз."}
            </div>
          </form>
        </div>
      )}
      <button className="callback-trigger" type="button" onClick={() => setExpanded(true)} aria-expanded={expanded}>
        Перезвоните мне
      </button>
    </aside>
  );
}

function LeadModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(OPEN_LEAD_FORM_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_LEAD_FORM_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    body.classList.add("lead-dialog-open");
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 20);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      body.classList.remove("lead-dialog-open");
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <div
      className="lead-modal-backdrop"
      hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <div
        className="lead-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button className="lead-dialog-close" type="button" onClick={() => setOpen(false)} aria-label="Закрыть форму">
          ×
        </button>
        <p className="lead-dialog-kicker">Расчёт под вашу нишу</p>
        <h2 id={titleId}>Получите расчёт</h2>
        <p id={descriptionId}>Укажите имя и номер телефона — мы уточним аудиторию, источники и формат получения контактов.</p>
        <LeadForm compact />
      </div>
    </div>
  );
}

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <>
      <header className="site-header">
        <div className="page-wrap header-inner">
          <Link className="brand" href="/" aria-label="techbdata — на главную">
            techbdata
          </Link>
          <nav className="site-nav" aria-label="Основная навигация">
            <a href="/#mechanics">Как работает</a>
            <Link href="/solutions" className={current === "solutions" ? "nav-case-active" : ""} aria-current={current === "solutions" ? "page" : undefined}>Решения</Link>
            <a href="/#tariffs">Тарифы</a>
            <a href="/#contact">Контакты</a>
          </nav>
          <div className="header-actions">
            <div className="header-contacts" aria-label="Контакты">
              <a href="tel:89778688057">8 977 868-80-57</a>
              <a href="https://t.me/techbdata" target="_blank" rel="noreferrer">Telegram</a>
            </div>
            <button className="header-cta" type="button" onClick={openLeadForm}>Рассчитать стоимость</button>
          </div>
        </div>
      </header>
      <LeadModal />
      <CallbackWidget />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-inner">
        <div className="footer-primary">
          <Link href="/" className="footer-brand">techbdata</Link>
          <p>Контакты аудитории вашей ниши для отдела продаж</p>
          <div className="footer-contacts">
            <a href="tel:89778688057">8 977 868-80-57</a>
            <a href="https://t.me/techbdata" target="_blank" rel="noreferrer">Telegram</a>
            {/* TODO: добавить e-mail после получения подтверждённого адреса. */}
            <span className="footer-email-slot" aria-hidden="true" />
          </div>
        </div>
        <div className="footer-legal">
          <strong>ИП ПЕТРОВ СТАНИСЛАВ СЕРГЕЕВИЧ</strong>
          <span>ИНН: 211485388853</span>
          <span>ОГРНИП: 322213000040850</span>
          <span>© 2018–2026 Все права защищены.</span>
        </div>
        <div className="footer-links">
          <a href={POLICY_URL} target="_blank" rel="noreferrer">Политика конфиденциальности</a>
          <a href={POLICY_URL} target="_blank" rel="noreferrer">Согласие на обработку персональных данных</a>
        </div>
      </div>
    </footer>
  );
}
