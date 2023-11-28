import type { DefaultCountryBasedFormatOptionKey } from './types';

import { getLocalCountryBasedFormat } from './helper';

export const DEFAULT_LOCAL_VALUE = 'LOCAL';

export const DEFAULT_COUNTRY_BASED_FORMAT_OPTIONS: Record<DefaultCountryBasedFormatOptionKey, CountryBasedFormat> = {
  LOCAL: getLocalCountryBasedFormat(),
  US: {
    dateFormat: 'd MMMM yyyy',
    dateTimeFormat: 'd MMMM yyyy HH:mm',
    currency: 'USD',
    locale: 'enUS',
    timeZone: 'America/New_York',
  },
  IN: {
    dateFormat: 'MMMM d, yyyy',
    dateTimeFormat: 'MMMM d, yyyy HH:mm',
    currency: 'INR',
    locale: 'enIN',
    timeZone: 'Asia/Kolkata',
  },
};
