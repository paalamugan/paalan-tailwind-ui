import type { FormatXMLElementFn, PrimitiveType } from 'intl-messageformat';

import { memoize } from '@formatjs/fast-memoize';
import { IntlMessageFormat } from 'intl-messageformat';

type Format<T> = Record<string, PrimitiveType | T | FormatXMLElementFn<T, string | T | (string | T)[]>> | undefined;

const formatters = {
  getNumberFormat: memoize((locale, opts) => new Intl.NumberFormat(locale, opts)),
  getDateTimeFormat: memoize((locale, opts) => new Intl.DateTimeFormat(locale, opts)),
  getPluralRules: memoize((locale, opts) => new Intl.PluralRules(locale, opts)),
};

/**
 * Translates a message using the provided values and locale.
 *
 * @param message - The message to be translated.
 * @param values - Optional values to be used for formatting the translated message.
 * @param locale - Optional locale to be used for translation.
 * @returns The translated message as a string.
 */
export const t = <T = void>(message: string, values?: Format<T>, locale?: string) => {
  try {
    return new IntlMessageFormat(message, locale, undefined, { formatters }).format(values) as string;
  } catch (error) {
    console.error(error);
    return message;
  }
};
