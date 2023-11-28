import type { TimeZone } from '@/constants/time-zones';
import type { CurrencyConverterOptions } from '@/utils/currency-converter';
import type { CountryBasedFormatOptionKey, CurrencyIntl, DateIntl, NumberIntl, t } from '@/utils/format';
import type { PropsWithChildren } from 'react';

export interface CurrencyExchange extends CurrencyConverterOptions {}

export interface FormatIntlProviderProps extends PropsWithChildren {
  /**
   * `countryBasedFormatOptions` is used to override the default format options for a specific country and add new format options.
   * The default format options are for the US and IN.
   * The LOCAL format options are used when the country code is not provided or the country code is not found in the countryBasedFormatOptions.
   * For example, if you want to add the new format options for France, you can do so by defining the following for typings:
   *
   *  `declare global {
   *   interface CountryBasedFormatOptions {
   *     FR: CountryBasedFormat
   *   }
   *  }`
   */
  countryBasedFormatOptions?: Partial<CountryBasedFormatOptions>;
  /**
   * `countryBasedFormatKey` is used to set the default country based format key for the format provider.
   * @default 'LOCAL'
   */
  countryBasedFormatKey?: CountryBasedFormatOptionKey;
  /**
   * `timeZone` is used to set the default time zone for the format provider.
   */
  timeZone?: TimeZone;
  /**
   * `currencyExchange` is used to convert from one currency to another.
   */
  currencyExchange?: CurrencyExchange;
  /**
   * `dateTimeFormat` are used to set the default date time format for the format provider.
   */
  dateTimeFormat?: string;
  /**
   *  `dateFormat` are used to set the default date format for the format provider.
   */
  dateFormat?: string;
}

export interface FormatIntlContextState {
  /**
   * `dateIntl` is used to format the date.
   */
  dateIntl: InstanceType<typeof DateIntl>;
  /**
   * `currencyIntl` is used to format the currency.
   */
  currencyIntl: InstanceType<typeof CurrencyIntl>;
  /**
   * `numberIntl` is used to format the number.
   */
  numberIntl: InstanceType<typeof NumberIntl>;
  /**
   * `t` is used to translate the text.
   */
  t: typeof t;
  /**
   * `countryBasedFormatKeys` is used to override the default format options for a specific country and add new format options.
   */
  countryBasedFormatKeys: CountryBasedFormatOptionKey[];
  /**
   * `countryBasedFormatKey` is used to set the country based format key for the format provider.
   */
  countryBasedFormatKey: FormatIntlProviderProps['countryBasedFormatKey'];
  /**
   *
   * @param countryCodeKey  The country code key is used to set the country based format key for the format provider.
   */
  setCountryBasedFormatKey: (countryCodeKey: FormatIntlProviderProps['countryBasedFormatKey']) => void;
  /**
   * `timeZone` is used to set the time zone for the format provider.
   */
  timeZone: FormatIntlProviderProps['timeZone'];
  /**
   *
   * @param timeZone The time zone is used to set the time zone for the format provider.
   */
  setTimeZone: (timeZone: FormatIntlProviderProps['timeZone']) => void;
  /**
   * `currencyExchange` is used to convert from one currency to another.
   */
  currencyExchange: CurrencyExchange;
  /**
   *
   * @param currencyExchange The currency exchange is used to update the currency exchange for the format provider.
   */
  updateCurrencyExchange: (currencyExchange: Partial<CurrencyExchange>) => void;
}
