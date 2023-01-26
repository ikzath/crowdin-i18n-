/**
 *  i18n uses Composer instance with vue3 now, 

 */
import { i18n } from "../../main";

// function is ready to run after the global i18n instance is created and
// when the app is mounted and i18n global is available in the setup() function
export function i18nBase(key: string): any {
  return i18n.global.t(key);
}

// vue3 i18n uses 't' instead of 'tc' for pluralization
export function i18nPlural(key: string, count: number): any {
  return i18n.global.t(key, count);
}

export function i18nDate(date: Date): any {
  return i18n.global.d(date);
}

export function i18nNumber(number: number): any {
  return i18n.global.n(number);
}
