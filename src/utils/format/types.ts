import type { TimeZone } from '@/constants/time-zones';
import type { CurrencyCode } from '../currency-converter';

export type AllLocaleType = typeof import('date-fns/locale');

export type DefaultCountryBasedFormatOptionKey = 'LOCAL' | 'US' | 'IN';

declare global {
  interface CountryBasedFormat {
    dateFormat?: string;
    dateTimeFormat?: string;
    currency: CurrencyCode;
    timeZone: TimeZone;
    locale: keyof AllLocaleType;
  }
  interface CountryBasedFormatOptions {
    LOCAL: CountryBasedFormat;
    US: CountryBasedFormat;
    IN: CountryBasedFormat;
  }
}
export type CountryBasedFormatOptionKey = keyof CountryBasedFormatOptions;
