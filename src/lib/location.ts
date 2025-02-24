import { cookies } from "next/headers";
import { Locale, defaultLocale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

async function getUserLocale() {
  const cookie = await cookies();
  return cookie.get(COOKIE_NAME)?.value || defaultLocale;
}

async function setUserLocale(locale: Locale) {
  const cookie = await cookies();
  cookie.set(COOKIE_NAME, locale);
}

export { getUserLocale, setUserLocale };
