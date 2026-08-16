/** Google フォーム（お問い合わせ）への POST 先・entry ID */
export const GOOGLE_CONTACT_FORM = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeyx_HgILqGQ3F7jreDisNEBueLLv-7KyR3I2OteBFe6noUdA/formResponse",
  entries: {
    name: "entry.1941525434",
    email: "entry.940126209",
    category: "entry.185520926",
    subject: "entry.1012350018",
    message: "entry.630052242",
  },
  categories: ["お仕事のご依頼", "料金・お見積もり", "その他"] as const,
  successMessage:
    "お問い合わせありがとうございます。内容を送信しました。折り返しご連絡いたします。",
} as const;

export type ContactCategory = (typeof GOOGLE_CONTACT_FORM.categories)[number];

export async function submitGoogleContactForm(data: {
  name: string;
  email: string;
  category: ContactCategory;
  subject: string;
  message: string;
}): Promise<void> {
  const { actionUrl, entries } = GOOGLE_CONTACT_FORM;
  const body = new URLSearchParams();
  body.set(entries.name, data.name);
  body.set(entries.email, data.email);
  body.set(entries.category, data.category);
  body.set(entries.subject, data.subject);
  body.set(entries.message, data.message);
  body.set("fvv", "1");

  await fetch(actionUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: body.toString(),
  });
}
