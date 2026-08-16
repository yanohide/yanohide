"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import {
  GOOGLE_CONTACT_FORM,
  submitGoogleContactForm,
  type ContactCategory,
} from "@/lib/google-form-contact";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "category" | "subject" | "message";

type FieldErrors = Partial<Record<FieldName, boolean>>;

type PortfolioContactFormProps = {
  layout?: "page" | "inline";
};

const inputClass = "portfolio-contact-form__input";

function inputClassName(hasError: boolean) {
  return hasError ? `${inputClass} portfolio-contact-form__input--error` : inputClass;
}

function validateFields(data: {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name) errors.name = true;
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = true;
  if (!data.category || !GOOGLE_CONTACT_FORM.categories.includes(data.category as ContactCategory)) {
    errors.category = true;
  }
  if (!data.subject) errors.subject = true;
  if (!data.message) errors.message = true;

  return errors;
}

export function PortfolioContactForm({ layout = "page" }: PortfolioContactFormProps) {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [category, setCategory] = useState<ContactCategory | "">("");
  const isPage = layout === "page";

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const selectedCategory = String(formData.get("category") ?? "") as ContactCategory;

    const errors = validateFields({
      name,
      email,
      category: selectedCategory,
      subject,
      message,
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setState("idle");
      return;
    }

    setFieldErrors({});
    setState("submitting");
    try {
      await submitGoogleContactForm({
        name,
        email,
        category: selectedCategory,
        subject,
        message,
      });
      setState("success");
      form.reset();
      setCategory("");
      setFieldErrors({});
    } catch {
      setState("error");
    }
  }

  useEffect(() => {
    if (!isPage || state === "success") return;

    const timer = window.setTimeout(() => {
      document.getElementById(`${formId}-name`)?.focus({ preventScroll: true });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [formId, isPage, state]);

  return (
    <div
      id="contact-form"
      className={`portfolio-contact-form mx-auto max-w-lg${
        isPage ? " portfolio-contact-form--page" : " portfolio-contact-form--inline"
      }${state === "success" ? " portfolio-contact-form--success" : ""}`}
    >
      <div className="portfolio-contact-form__panel">
        <div className="portfolio-contact-form__panel-inner">
          {state === "success" ? (
            <div className="portfolio-contact-form__success text-center" role="status" aria-live="polite">
              <p className="portfolio-contact-form__success-title">送信完了</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                {GOOGLE_CONTACT_FORM.successMessage}
              </p>
              <Link href="/" className="portfolio-contact-form__submit mt-6">
                ホームに戻る
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5 text-center">
                <h1 className="text-lg font-bold text-blue-900 md:text-xl">お問い合わせ</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  ご質問、ご相談などがございましたら、お気軽にお問い合わせください。担当よりご指定のメールアドレスに回答いたします。
                </p>
              </div>

              <form
                className="portfolio-contact-form__body space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label className="portfolio-contact-form__label" htmlFor={`${formId}-name`}>
                    お名前
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={fieldErrors.name ? true : undefined}
                    className={inputClassName(Boolean(fieldErrors.name))}
                    disabled={state === "submitting"}
                    onChange={() => clearFieldError("name")}
                  />
                </div>

                <div>
                  <label className="portfolio-contact-form__label" htmlFor={`${formId}-email`}>
                    メールアドレス
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-invalid={fieldErrors.email ? true : undefined}
                    className={inputClassName(Boolean(fieldErrors.email))}
                    disabled={state === "submitting"}
                    onChange={() => clearFieldError("email")}
                  />
                </div>

                <div>
                  <label className="portfolio-contact-form__label" htmlFor={`${formId}-category`}>
                    お問い合わせの種類
                  </label>
                  <select
                    id={`${formId}-category`}
                    name="category"
                    required
                    value={category}
                    aria-invalid={fieldErrors.category ? true : undefined}
                    onChange={(event) => {
                      setCategory(event.target.value as ContactCategory | "");
                      clearFieldError("category");
                    }}
                    className={inputClassName(Boolean(fieldErrors.category))}
                    disabled={state === "submitting"}
                  >
                    <option value="">選択</option>
                    {GOOGLE_CONTACT_FORM.categories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="portfolio-contact-form__label" htmlFor={`${formId}-subject`}>
                    件名
                  </label>
                  <input
                    id={`${formId}-subject`}
                    name="subject"
                    type="text"
                    required
                    aria-invalid={fieldErrors.subject ? true : undefined}
                    className={inputClassName(Boolean(fieldErrors.subject))}
                    disabled={state === "submitting"}
                    onChange={() => clearFieldError("subject")}
                  />
                </div>

                <div>
                  <label className="portfolio-contact-form__label" htmlFor={`${formId}-message`}>
                    お問い合わせ詳細
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={5}
                    required
                    aria-invalid={fieldErrors.message ? true : undefined}
                    className={`${inputClassName(Boolean(fieldErrors.message))} portfolio-contact-form__input--textarea`}
                    disabled={state === "submitting"}
                    onChange={() => clearFieldError("message")}
                  />
                </div>

                {Object.keys(fieldErrors).length > 0 ? (
                  <p className="text-sm text-red-600" role="alert">
                    入力内容に誤りがあります。赤色の項目をご確認ください。
                  </p>
                ) : null}

                {state === "error" ? (
                  <p className="text-sm text-red-600" role="alert">
                    送信に失敗しました。入力内容をご確認のうえ、もう一度お試しください。
                  </p>
                ) : null}

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="portfolio-contact-form__submit"
                    disabled={state === "submitting"}
                  >
                    {state === "submitting" ? "送信中…" : "送信"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
