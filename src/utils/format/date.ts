import type { TimeZone } from '@/constants/time-zones';
import type { Locale } from 'date-fns';

import { formatRelative, isAfter, isValid } from 'date-fns';
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { getLocalCountryBasedFormat } from './helper';

export type BaseDateType = string | Date | number;

export interface IDateTransformer<D extends BaseDateType = BaseDateType> {
  parse(value: unknown, timeZone: string, locale?: Locale): Date;
  convert(value: D, timeZone: string, locale?: Locale): string;
}

class DateTransformer implements IDateTransformer<BaseDateType> {
  parse(value: BaseDateType, timeZone: string, locale?: Locale): Date {
    return utcToZonedTime(value, timeZone, { locale });
  }

  convert(value: Date, timeZone: string, locale?: Locale): string {
    return zonedTimeToUtc(value, timeZone, { locale }).toISOString();
  }
}

export interface IDateOptions<D extends BaseDateType = BaseDateType> {
  dateFormat: string;
  dateTimeFormat: string;
  transformer?: IDateTransformer<D>;
  timeZone?: TimeZone;
  locale?: Locale;
  fallback?: string;
}

export interface FormatOptions<D extends BaseDateType>
  extends Partial<Omit<IDateOptions<D>, 'transformer' | 'dateTimeFormat'>> {}

/**
 * Represents a utility class for formatting dates and times.
 * @template D - The type of the date value.
 */
export class DateIntl<D extends BaseDateType> {
  /**
   * The locale to be used for formatting.
   */
  readonly locale?: Locale;
  /**
   * The format string for date-only formatting.
   */
  readonly dateFormat: string;
  /**
   * The format string for date and time formatting.
   */
  readonly dateTimeFormat: string;
  /**
   * The transformer used for parsing and converting dates.
   */
  readonly transformer: IDateTransformer;
  /**
   * The fallback string to be used when formatting fails.
   */
  readonly fallback: string;
  /**
   * The time zone to be used for formatting.
   */
  readonly timeZone: TimeZone;

  /**
   * Constructs a new instance of the DateIntl class.
   * @param options - The options for configuring the DateIntl instance.
   */
  constructor({ locale, dateFormat, dateTimeFormat, transformer, timeZone, fallback }: IDateOptions<D>) {
    const defaultTimeZone = getLocalCountryBasedFormat().timeZone;
    this.locale = locale || undefined;
    this.dateFormat = dateFormat;
    this.dateTimeFormat = dateTimeFormat;
    this.transformer = transformer || dateTransformer;
    this.timeZone = timeZone === 'LOCAL' ? defaultTimeZone : timeZone || defaultTimeZone;
    this.fallback = fallback || 'N/A';
  }

  /**
   * Formats the given date value using the specified options.
   * @param value - The date value to format.
   * @param options - The options for formatting the date.
   * @returns The formatted date string.
   */
  format(value: D, options?: FormatOptions<D>): string {
    const {
      dateFormat = this.dateFormat,
      timeZone = this.timeZone,
      locale = this.locale,
      fallback = this.fallback,
    } = options ?? {};
    if (!this.isValid(value)) return fallback;
    return formatInTimeZone(this.toDate(value), timeZone, dateFormat, { locale: locale });
  }

  /**
   * Formats the given date value as a date string using the specified options.
   * @param value - The date value to format.
   * @param options - The options for formatting the date.
   * @returns The formatted date string.
   */
  formatDate(value: D, options?: FormatOptions<D>): string {
    return this.format(value, options);
  }

  /**
   * Formats the given date value as a date and time string using the specified options.
   * @param value - The date value to format.
   * @param options - The options for formatting the date and time.
   * @returns The formatted date and time string.
   */
  formatDateTime(value: D, options?: FormatOptions<D>): string {
    return this.format(value, {
      ...options,
      dateFormat: options?.dateFormat || this.dateTimeFormat,
    });
  }

  /**
   * Formats the given date value as a relative time string.
   * @param value - The date value to format.
   * @param baseDate - The base date to calculate the relative time from.
   * @param options - The options for formatting the relative time.
   * @returns The formatted relative time string.
   */
  formatRelativeTime(value: D, baseDate?: D, options?: Parameters<typeof formatRelative>[2]): string {
    if (!this.isValid(value)) return this.fallback;
    return formatRelative(this.toDate(value), this.toDate(baseDate || new Date()), {
      locale: options?.locale || this.locale,
      ...options,
    });
  }

  /**
   * Converts the given date value to a string representation.
   * @param date - The date value to convert.
   * @returns The string representation of the date.
   */
  given(date: D): string {
    return this.toInput(date);
  }

  /**
   * Gets the current date and time as a string representation.
   * @returns The string representation of the current date and time.
   */
  now(): string {
    return this.toInput(new Date());
  }

  /**
   * Gets a past date as a string representation.
   * @param minDate - The minimum date to generate the range from.
   * @returns The string representation of the past date.
   */
  past(minDate?: D): string {
    const today = new Date();
    return this.range(minDate ?? (new Date(today.getFullYear() - 1, today.getMonth()) as D), today as D);
  }

  /**
   * Gets a future date as a string representation.
   * @param maxDate - The maximum date to generate the range to.
   * @returns The string representation of the future date.
   */
  future(maxDate?: D): string {
    const today = new Date();
    return this.range(today as D, maxDate ?? (new Date(today.getFullYear() + 1, today.getMonth()) as D));
  }

  /**
   * Generates a random date within the specified range and returns it as a string representation.
   * @param minDate - The minimum date of the range.
   * @param maxDate - The maximum date of the range.
   * @returns The string representation of the random date.
   * @throws An error if the maxDate is not greater than the minDate.
   */
  range(minDate: D, maxDate: D) {
    if (isAfter(this.toDate(minDate), this.toDate(maxDate))) {
      throw new Error('maxDate should be greater than minDate');
    }

    const minValue = this.toDate(minDate).getTime();
    const maxValue = this.toDate(maxDate).getTime();

    const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    return this.toInput(new Date(timestamp));
  }

  /**
   * Checks if the given value is a valid date.
   * @param value - The value to check.
   * @returns True if the value is a valid date, false otherwise.
   */
  isValid(value: unknown): boolean {
    if (!value || (isNaN(Date.parse((value as string).toString())) && !isValid(value))) {
      return false;
    }
    return true;
  }

  /**
   * Checks if two dates are the same day.
   * @param date1 - The first date to compare.
   * @param date2 - The second date to compare.
   * @returns True if the dates are the same day, false otherwise.
   */
  isSameDay(date1: D, date2: D): boolean {
    const day1 = this.toDate(date1).getDate();
    const day2 = this.toDate(date2).getDate();

    return day1 === day2;
  }

  private isDate(value: unknown): value is Date {
    return value instanceof Date;
  }

  private toDate(value: unknown): Date {
    if (!this.isValid(value)) {
      throw new Error('Invalid date');
    }

    return this.isDate(value) ? value : this.transformer.parse(value, this.timeZone, this.locale);
  }

  private toInput(value: unknown): string {
    const date = this.toDate(value);

    return this.transformer.convert(date, this.timeZone, this.locale);
  }
}

const dateTransformer = new DateTransformer();

export const DEFAULT_DATE_OPTIONS: IDateOptions = {
  dateFormat: getLocalCountryBasedFormat().dateFormat,
  dateTimeFormat: getLocalCountryBasedFormat().dateTimeFormat,
  timeZone: getLocalCountryBasedFormat().timeZone,
};

export const defaultDateIntl = new DateIntl(DEFAULT_DATE_OPTIONS);
