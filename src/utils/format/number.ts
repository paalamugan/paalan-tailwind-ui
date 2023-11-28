export interface INumberIntl {
  format(value: number | string, options?: Intl.NumberFormatOptions): string;
}

export interface INumberIntlOptions {
  locale?: string;
  fallback?: string;
}

/**
 * Represents a class for formatting numbers based on internationalization settings.
 */
export class NumberIntl implements INumberIntl {
  readonly locale?: string;
  readonly fallback: string;

  /**
   * Creates an instance of NumberIntl.
   * @param options - The options for configuring the NumberIntl instance.
   */
  constructor({ locale, fallback }: INumberIntlOptions = {}) {
    this.locale = locale || undefined;
    this.fallback = fallback ?? 'N/A';
  }

  /**
   * Formats the given value as a string based on the provided options.
   * @param value - The value to be formatted.
   * @param options - The options for formatting the number.
   * @returns The formatted number as a string.
   */
  format(value: number | string, options: Intl.NumberFormatOptions = {}): string {
    if (!this.isValid(value)) return this.fallback;

    return new Intl.NumberFormat(this.locale, options).format(Number(value));
  }

  private isValid(value: number | string): boolean {
    if (!value || Number.isNaN(value) || Number.isNaN(Number(value))) {
      return false;
    }

    return true;
  }
}

export const defaultNumberIntl = new NumberIntl();
