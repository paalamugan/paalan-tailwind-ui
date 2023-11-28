import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { CountryBasedFormatOptionKey } from '@/utils';
import type { FormatIntlContextState, FormatIntlProviderProps } from './types';

import { NumberIntl } from '@/utils';
import { DEFAULT_COUNTRY_BASED_FORMAT_OPTIONS, DEFAULT_LOCAL_VALUE } from '@/utils/format/constants';
import { CurrencyIntl } from '@/utils/format/currency';
import { DateIntl } from '@/utils/format/date';
import { getLocalCountryBasedFormat, getLocale } from '@/utils/format/helper';
import { t } from '@/utils/format/translate';

import { FormatIntlContextProvider } from './context';

export const FormatIntlProvider = ({
  children,
  countryBasedFormatKey: defaultCountryBasedFormatKey = 'LOCAL',
  timeZone: defaultTimeZone,
  dateFormat: defaultDateFormat,
  dateTimeFormat: defaultDateTimeFormat,
  currencyExchange: defaultCurrencyExchange,
  countryBasedFormatOptions,
}: FormatIntlProviderProps) => {
  const [countryBasedFormatKey, setCountryBasedFormatKey] = useState(defaultCountryBasedFormatKey);
  const [locale, setLocale] = useState<Locale>();
  const localeCacheRef = useRef<Record<string, Locale | undefined>>({});
  const [currencyExchange, setCurrencyExchange] = useState({
    ...defaultCurrencyExchange,
  });

  useEffect(() => {
    setCountryBasedFormatKey(defaultCountryBasedFormatKey);
  }, [defaultCountryBasedFormatKey]);

  const countryFormatIntlOptions = useMemo<Partial<CountryBasedFormatOptions>>(() => {
    return {
      ...DEFAULT_COUNTRY_BASED_FORMAT_OPTIONS,
      ...countryBasedFormatOptions,
    };
  }, [countryBasedFormatOptions]);

  const selectedCountryFormat = useMemo(() => {
    const localFormat = getLocalCountryBasedFormat();
    if (!countryBasedFormatKey || countryBasedFormatKey === 'LOCAL') {
      return {
        ...localFormat,
        dateFormat: defaultDateFormat || localFormat.dateFormat,
        dateTimeFormat: defaultDateTimeFormat || localFormat.dateTimeFormat,
        timeZone: defaultTimeZone || countryBasedFormatKey === 'LOCAL' ? 'LOCAL' : localFormat.timeZone,
      };
    }

    const option = countryFormatIntlOptions[countryBasedFormatKey];
    return {
      ...option,
      dateFormat: option?.dateFormat || defaultDateFormat || localFormat.dateFormat,
      dateTimeFormat: option?.dateTimeFormat || defaultDateTimeFormat || localFormat.dateTimeFormat,
      locale: option?.locale || localFormat.locale,
      currency: option?.currency || localFormat.currency,
      timeZone: option?.timeZone || localFormat.timeZone,
    };
  }, [countryBasedFormatKey, defaultDateFormat, defaultDateTimeFormat, defaultTimeZone, countryFormatIntlOptions]);

  const [timeZone, setTimeZone] = useState(() => selectedCountryFormat.timeZone);

  useEffect(() => {
    setTimeZone(selectedCountryFormat.timeZone);
  }, [selectedCountryFormat.timeZone]);

  useEffect(() => {
    if (!defaultTimeZone) return;
    setTimeZone(defaultTimeZone);
  }, [defaultTimeZone]);

  useEffect(() => {
    const fetchLocale = async () => {
      if (!selectedCountryFormat) return;
      const localeValue = selectedCountryFormat.locale;
      if (!localeValue) return;
      if (localeCacheRef.current[localeValue]) {
        return setLocale(localeCacheRef.current[localeValue]);
      }
      const locale = await getLocale(selectedCountryFormat.locale);
      if (locale) {
        localeCacheRef.current[localeValue] = locale;
      }
      setLocale(locale);
    };
    fetchLocale();
  }, [selectedCountryFormat]);

  const onChangeCountryCode: FormatIntlContextState['setCountryBasedFormatKey'] = useCallback(
    (value) => {
      if (!value || !countryFormatIntlOptions[value]) return setCountryBasedFormatKey(DEFAULT_LOCAL_VALUE);
      setCountryBasedFormatKey(value);
    },
    [countryFormatIntlOptions],
  );

  const onChangeCurrencyExchange: FormatIntlContextState['updateCurrencyExchange'] = useCallback((value) => {
    setCurrencyExchange((state) => {
      return {
        ...state,
        ...value,
      };
    });
  }, []);

  const onChangeTimezone: FormatIntlContextState['setTimeZone'] = useCallback((value) => {
    setTimeZone(value ? value : 'LOCAL');
  }, []);

  const dateIntl = useMemo(() => {
    return new DateIntl({ ...selectedCountryFormat, locale, timeZone: timeZone });
  }, [locale, selectedCountryFormat, timeZone]);

  const currencyIntl = useMemo(() => {
    return new CurrencyIntl({
      currency: selectedCountryFormat.currency,
      locale: locale?.code,
      ...currencyExchange,
    });
  }, [selectedCountryFormat.currency, currencyExchange, locale?.code]);

  const numberIntl = useMemo(() => {
    return new NumberIntl({ locale: locale?.code });
  }, [locale?.code]);

  const translate: FormatIntlContextState['t'] = useCallback(
    (message, values, localeCode) => {
      return t(message, values, localeCode || locale?.code);
    },
    [locale?.code],
  );

  const countryBasedFormatKeys = useMemo(() => {
    return Object.keys(countryFormatIntlOptions).filter(Boolean) as CountryBasedFormatOptionKey[];
  }, [countryFormatIntlOptions]);

  return (
    <FormatIntlContextProvider
      value={{
        dateIntl,
        currencyIntl,
        numberIntl,
        t: translate,
        countryBasedFormatKeys,
        countryBasedFormatKey,
        setCountryBasedFormatKey: onChangeCountryCode,
        timeZone,
        setTimeZone: onChangeTimezone,
        updateCurrencyExchange: onChangeCurrencyExchange,
        currencyExchange,
      }}
    >
      {children}
    </FormatIntlContextProvider>
  );
};
