import type { CurrencyCode } from './constants';

import axios from 'axios';
import { load } from 'cheerio';

import { CURRENCY_CODES, CURRENCY_RECORD } from './constants';

export interface CurrencyConverterOptions {
  from?: CurrencyCode;
  to?: CurrencyCode;
  amount?: number;
  isDecimalComma?: boolean;
}

export interface RatesCacheOptions {
  isRatesCaching: boolean;
  ratesCacheDuration: number;
}

export interface ICurrencyConverter {
  from: (currencyFrom: CurrencyCode) => CurrencyConverter;
  to: (currencyFrom: CurrencyCode) => CurrencyConverter;
  amount: (currencyAmount: number) => CurrencyConverter;
  setDecimalComma: (isDecimalComma: boolean) => CurrencyConverter;
  setupRatesCache: (ratesCacheOptions: RatesCacheOptions) => CurrencyConverter;
  rates: () => Promise<number>;
  convert: (currencyAmount?: number) => Promise<number>;
  getCurrencyName: (currencyCode: CurrencyCode) => string;
  addRateToRatesCache: (currencyPair: string, rate: number) => void;
}

export class CurrencyConverter implements ICurrencyConverter {
  readonly currencyRecord = CURRENCY_RECORD;
  readonly currencyCodes = CURRENCY_CODES;
  currencyFrom: string;
  currencyTo: string;
  currencyAmount: number;
  convertedValue: number;
  isDecimalComma: boolean;
  isRatesCaching: boolean;
  ratesCacheDuration: number;
  ratesCache: Record<string, { rate: number; expiryDate: Date }>;

  constructor(options: CurrencyConverterOptions = {}) {
    this.currencyFrom = '';
    this.currencyTo = '';
    this.currencyAmount = 1;
    this.convertedValue = 0;
    this.isDecimalComma = false;
    this.isRatesCaching = false;
    this.ratesCacheDuration = 0;
    this.ratesCache = {};

    if (options) {
      if (options.from) this.from(options.from);

      if (options.to) this.to(options.to);

      if (options.amount) this.amount(options.amount);

      if (options.isDecimalComma !== undefined) this.setDecimalComma(options.isDecimalComma);
    }
  }

  from(currencyFrom: CurrencyCode) {
    if (typeof currencyFrom !== 'string') throw new TypeError('currency code should be a string');

    if (!this.currencyCodes.includes(currencyFrom.toUpperCase()))
      throw new Error(`${currencyFrom} is not a valid currency code`);

    this.currencyFrom = currencyFrom.toUpperCase();
    return this;
  }

  to(currencyTo: CurrencyCode) {
    if (typeof currencyTo !== 'string') throw new TypeError('currency code should be a string');

    if (!this.currencyCodes.includes(currencyTo.toUpperCase()))
      throw new Error(`${currencyTo} is not a valid currency code`);

    this.currencyTo = currencyTo;
    return this;
  }

  amount(currencyAmount: number) {
    if (typeof currencyAmount !== 'number') throw new TypeError('amount should be a number');

    if (currencyAmount <= 0) throw new Error('amount should be a positive number');

    this.currencyAmount = currencyAmount;
    return this;
  }

  setDecimalComma(isDecimalComma: boolean) {
    if (typeof isDecimalComma !== 'boolean') throw new TypeError('isDecimalComma should be a boolean');

    this.isDecimalComma = isDecimalComma;
    return this;
  }

  replaceAll(text: string, queryString: string, replaceString: string) {
    let text_ = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === queryString) {
        text_ += replaceString;
      } else {
        text_ += text[i];
      }
    }
    return text_;
  }

  setupRatesCache(ratesCacheOptions: RatesCacheOptions) {
    if (typeof ratesCacheOptions !== 'object') throw new TypeError('ratesCacheOptions should be an object');

    if (ratesCacheOptions.isRatesCaching === undefined)
      throw new Error(`ratesCacheOptions should have a property called isRatesCaching`);

    if (typeof ratesCacheOptions.isRatesCaching !== 'boolean')
      throw new TypeError('ratesCacheOptions.isRatesCaching should be a boolean');

    if (typeof ratesCacheOptions.ratesCacheDuration !== 'number')
      throw new TypeError('ratesCacheOptions.ratesCacheDuration should be a number');

    if (ratesCacheOptions.ratesCacheDuration <= 0)
      throw new Error('ratesCacheOptions.ratesCacheDuration should be a positive number of seconds');

    this.isRatesCaching = ratesCacheOptions.isRatesCaching;

    if (!ratesCacheOptions.ratesCacheDuration) this.ratesCacheDuration = 3600; // Defaults to 3600 seconds (1 hour)
    else this.ratesCacheDuration = ratesCacheOptions.ratesCacheDuration;

    return this;
  }

  async rates() {
    if (this.currencyFrom === this.currencyTo) return 1;

    const currencyPair = this.currencyFrom.toUpperCase() + '_' + this.currencyTo.toUpperCase();
    const now = new Date();
    if (currencyPair in this.ratesCache && now < this.ratesCache[currencyPair].expiryDate) {
      return this.ratesCache[currencyPair].rate;
    }
    const response = await axios.get(
      `https://www.google.com/search?q=${this.currencyAmount}+${this.currencyFrom}+to+${this.currencyTo}+&hl=en`,
    );

    const $ = load(response.data);
    let ratesText = $('.dDoNo').text().split(' ')[0];
    if (this.isDecimalComma) {
      if (ratesText.includes('.')) ratesText = this.replaceAll(ratesText, '.', '');
      if (ratesText.includes(',')) ratesText = this.replaceAll(ratesText, ',', '.');
    } else {
      if (ratesText.includes(',')) ratesText = this.replaceAll(ratesText, ',', '');
    }

    const rates = parseFloat(ratesText) / this.currencyAmount;
    if (this.isRatesCaching) {
      this.addRateToRatesCache(currencyPair, rates);
    }
    return rates;
  }

  async convert(currencyAmount?: number) {
    if (currencyAmount) {
      this.amount(currencyAmount);
    }

    if (!this.currencyFrom) throw new Error('currency code cannot be an empty string');

    if (!this.currencyTo) throw new Error('currency code cannot be an empty string');

    if (!this.currencyAmount) throw new Error('currency amount should be a positive value');

    const rates = await this.rates();
    this.convertedValue = rates * this.currencyAmount;
    return this.convertedValue;
  }

  getCurrencyName(currencyCode: CurrencyCode) {
    if (typeof currencyCode !== 'string') throw new TypeError('currency code should be a string');

    if (!this.currencyCodes.includes(currencyCode.toUpperCase()))
      throw new Error(`${currencyCode} is not a valid currency code`);

    return this.currencyRecord[currencyCode];
  }

  addRateToRatesCache(currencyPair: string, rate: number) {
    if (typeof currencyPair !== 'string') throw new TypeError('currency pair should be a string');

    if (typeof rate !== 'number') throw new TypeError('rate should be a number');

    const now = new Date();
    if (currencyPair in this.ratesCache) {
      if (now > this.ratesCache[currencyPair].expiryDate) {
        const newExpiry = new Date();
        newExpiry.setSeconds(newExpiry.getSeconds() + this.ratesCacheDuration);
        this.ratesCache[currencyPair] = {
          rate,
          expiryDate: newExpiry,
        };
      }
    } else {
      const newExpiry = new Date();
      newExpiry.setSeconds(newExpiry.getSeconds() + this.ratesCacheDuration);
      this.ratesCache[currencyPair] = {
        rate,
        expiryDate: newExpiry,
      };
    }
  }
}

export const defaultCurrencyConverter = new CurrencyConverter();
