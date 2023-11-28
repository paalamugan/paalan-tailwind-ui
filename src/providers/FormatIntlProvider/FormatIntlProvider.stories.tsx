import { useState } from 'react';

import type { TimeZone } from '@/constants/time-zones';
import type { CurrencyCode } from '@/utils/currency-converter';
import type { CountryBasedFormatOptionKey } from '@/utils/format';
import type { Meta, StoryFn } from '@storybook/react';

import { addDays } from 'date-fns';

import { Button, Combobox, NumberInput, toast } from '@/components';
import { Select } from '@/components/Select';
import { ToggleGroup } from '@/components/ToggleGroup';
import { TIME_ZONE_LISTS } from '@/constants/time-zones';
import {
  Box,
  Flex,
  Heading,
  HStack,
  LI,
  Stack,
  Strong,
  TableLayout,
  TBody,
  TD,
  Text,
  TH,
  THead,
  TR,
  UL,
  VStack,
} from '@/layouts';
import { CURRENCY_CODES } from '@/utils/currency-converter';

import { useFormatIntl } from './context';
import { FormatIntlProvider } from './FormatIntlProvider';

const meta = {
  title: 'providers/FormatIntlProvider',
  component: FormatIntlProvider,
} satisfies Meta<typeof FormatIntlProvider>;

export default meta;

export function DateFormatter() {
  const App = () => {
    const { dateIntl, setTimeZone, timeZone, setCountryBasedFormatKey, countryBasedFormatKeys, countryBasedFormatKey } =
      useFormatIntl();
    const currentDate = new Date();
    const add2Days = addDays(currentDate, 2);
    const tableColumns = [
      {
        id: 'dateFormat',
        label: 'Date Format',
      },
      {
        id: 'dateTimeFormat',
        label: 'Date Time Format',
      },
      {
        id: 'locale',
        label: 'Locale',
      },
      {
        id: 'timeZone',
        label: 'Time Zone',
      },
    ];
    const result: Record<string, string> = {
      dateFormat: dateIntl.dateFormat,
      dateTimeFormat: dateIntl.dateTimeFormat,
      timeZone: dateIntl.timeZone || 'undefined',
      locale: dateIntl.locale?.code?.toString() || 'undefined',
    };

    return (
      <Stack>
        <Heading as="h2">Date Formatter</Heading>

        <HStack justifyContent="between" gap="12">
          <Select
            label="Select a Country"
            value={countryBasedFormatKey}
            options={countryBasedFormatKeys}
            onValueChange={(value: CountryBasedFormatOptionKey) => {
              setCountryBasedFormatKey(value);
            }}
          />
          <ToggleGroup
            label="Timezone"
            type="single"
            value={timeZone}
            onValueChange={(value: TimeZone) => {
              setTimeZone(value);
            }}
            items={[
              { content: 'LOCAL', value: 'LOCAL' },
              { content: 'UTC', value: 'UTC' },
              { content: 'America/Los_Angeles', value: 'America/Los_Angeles' },
            ]}
          />
        </HStack>
        <Heading as="h5" mt="5">
          Format Value
        </Heading>
        <TableLayout>
          <THead>
            <TR className="m-0 border-t border-slate-300 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
              {tableColumns.map((column) => (
                <TH
                  key={column.id}
                  className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {column.label}
                </TH>
              ))}
            </TR>
          </THead>
          <TBody>
            <TR className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
              {tableColumns.map((column) => (
                <TD
                  key={column.id}
                  className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {result[column.id]}
                </TD>
              ))}
            </TR>
          </TBody>
        </TableLayout>
        <VStack>
          <UL>
            <LI>
              <Strong>Override Default Format With (MMMM d, yyyy HH:mm)</Strong>(Today) -{' '}
              {dateIntl.format(currentDate, { dateFormat: 'MMMM d, yyyy HH:mm' })}
            </LI>
            <LI>
              <Strong>Format Date</Strong>(Today) - {dateIntl.formatDate(currentDate)}
            </LI>
            <LI>
              <Strong>Format Date Time</Strong>(Today) - {dateIntl.formatDateTime(currentDate)}
            </LI>
            <LI>
              <Strong>Format Relative Time</Strong>(Today) - {dateIntl.formatRelativeTime(currentDate)}
            </LI>
            <LI>
              <Strong>Given</Strong>(Today) - {dateIntl.formatDateTime(dateIntl.given(currentDate))}
            </LI>
            <LI>
              <Strong>Past</Strong>(Past Day from today) - {dateIntl.formatDateTime(dateIntl.past())}
            </LI>
            <LI>
              <Strong>Now</Strong>(Current Date) - {dateIntl.formatDateTime(dateIntl.now())}
            </LI>
            <LI>
              <Strong>Future</Strong>(Future Day from today) - {dateIntl.formatDateTime(dateIntl.future())}
            </LI>
            <LI>
              <Strong>IsValid</Strong> - {dateIntl.isValid(currentDate).toString()}
            </LI>
            <LI>
              <Strong>IsSameDay</Strong> - {dateIntl.isSameDay(currentDate, new Date()).toString()}
            </LI>
            <LI>
              <Strong>Range</Strong>(MinDate - {currentDate.toLocaleDateString()}, MaxDate:{' '}
              {add2Days.toLocaleDateString()}) - {dateIntl.formatDateTime(dateIntl.range(currentDate, add2Days))}
            </LI>
          </UL>
        </VStack>
      </Stack>
    );
  };
  return (
    <FormatIntlProvider>
      <App />
    </FormatIntlProvider>
  );
}

export function CurrencyFormatter() {
  const App = () => {
    const { setCountryBasedFormatKey, currencyIntl, currencyExchange, countryBasedFormatKeys, updateCurrencyExchange } =
      useFormatIntl();
    const [isConverting, setIsConverting] = useState(false);
    const [convertedCurrency, setConvertedCurrency] = useState<number>();

    const onConvert = async () => {
      try {
        setIsConverting(true);
        const result = await currencyIntl.convert(2000);
        setConvertedCurrency(result);
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setIsConverting(false);
      }
    };

    return (
      <Stack>
        <Heading as="h2" mb="4">
          Currency Formatter
        </Heading>

        <HStack justifyContent="between" gap="12">
          <Select
            label="Select a Country"
            options={countryBasedFormatKeys}
            onValueChange={(value: CountryBasedFormatOptionKey) => {
              setCountryBasedFormatKey(value);
            }}
          />
        </HStack>

        <VStack>
          <UL>
            <LI>
              Currency - <Strong>{currencyIntl.currency}</Strong>
            </LI>
            <LI>
              Amount - <Strong>{currencyIntl.format(2000)}</Strong>
            </LI>
          </UL>
        </VStack>

        {/** TODO: Hide the below content, because functionality is not completed yet */}
        <Box hidden>
          <Stack gap="4">
            <Heading as="h5" mt="5">
              Convert Currency
            </Heading>
            <Flex gap="4" alignItems="end">
              <Select
                label="From"
                value="USD"
                options={CURRENCY_CODES}
                onValueChange={(value: CurrencyCode) => {
                  updateCurrencyExchange({ from: value });
                }}
              />
              <Select
                label="To"
                value="INR"
                options={CURRENCY_CODES}
                onValueChange={(value: CurrencyCode) => {
                  updateCurrencyExchange({ to: value });
                }}
              />
              <Button onClick={onConvert} isLoading={isConverting}>
                Convert
              </Button>
            </Flex>
            <Text>
              Converted Currency from <Strong>{currencyExchange.from}</Strong> to <Strong>{currencyExchange.to}</Strong>{' '}
              - <Strong>{convertedCurrency || 'N/A'}</Strong>
            </Text>
          </Stack>
        </Box>
      </Stack>
    );
  };
  return (
    <FormatIntlProvider>
      <App />
    </FormatIntlProvider>
  );
}

export function NumberFormatter() {
  const App = () => {
    const { setCountryBasedFormatKey, numberIntl, countryBasedFormatKeys } = useFormatIntl();
    const [value, setValue] = useState('');

    return (
      <Stack>
        <Heading as="h2" mb="4">
          Number Formatter
        </Heading>

        <VStack gap="4">
          <Select
            label="Select a Country"
            options={countryBasedFormatKeys}
            onValueChange={(value: CountryBasedFormatOptionKey) => {
              setCountryBasedFormatKey(value);
            }}
          />
          <NumberInput label="Enter a Number" placeholder="Enter a Number" value={value} onValueChange={setValue} />
        </VStack>

        <Text mt="4">
          <Strong>Formatted Number</Strong> - {numberIntl.format(value)}
        </Text>
      </Stack>
    );
  };
  return (
    <FormatIntlProvider>
      <App />
    </FormatIntlProvider>
  );
}

export function TranslateText() {
  const App = () => {
    const { t } = useFormatIntl();
    const localeMessages = {
      US: {
        text1: 'My name is {name}.',
        text2: 'At {1,time,::jmm} on {1,date,::dMMMM}, there was {2} apes on planet{0,number,integer}.',
        text3: 'Today is: {now, date, ::yyyyMMdd}',
        text4: `You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}`,
      },
      ES: {
        text1: 'Mi nombre es {name}.',
        text2: 'A las {1,time,::jmm} del {1,date,::dMMMM}, había {2} en el planeta{0,number,integer}.',
        text3: 'Hoy es: {now, date, ::yyyyMMdd}',
        text4: `Tienes {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}`,
      },
      FR: {
        text1: "Je m'appelle {name}.",
        text2: 'À {1,time,::jmm} le {1,date,::dMMMM}, il y avait {2} sur la planète{0,number,integer}.',
        text3: "Aujourd'hui est: {now, date, ::yyyyMMdd}",
        text4: `Vous avez {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}`,
      },
    };
    const [locale, setLocale] = useState<keyof typeof localeMessages>('US');

    return (
      <Stack>
        <Heading as="h2" mb="4">
          Translate
        </Heading>

        <VStack gap="4">
          <Select
            label="Select a Language"
            value={locale}
            options={[
              {
                label: 'USA',
                value: 'US',
              },
              {
                label: 'Spain',
                value: 'ES',
              },
              {
                label: 'France',
                value: 'FR',
              },
            ]}
            onValueChange={(value: keyof typeof localeMessages) => {
              setLocale(value);
            }}
          />
        </VStack>

        <Stack gap="4" mt="4">
          <Text>
            <Strong>Translated Text</Strong> - {t(localeMessages[locale].text1, { name: 'Paala' }, locale)}
          </Text>
          <Text>
            <Strong>Translated Text</Strong> -{' '}
            {t(localeMessages[locale].text2, { 1: new Date(), 2: 'two', 0: '6' }, locale)}
          </Text>
          <Text>
            <Strong>Translated Text</Strong> -{' '}
            {t(
              localeMessages[locale].text3,
              {
                now: new Date(),
              },
              locale,
            )}
          </Text>
          <Text>
            <Strong>Translated Text</Strong> - {t(localeMessages[locale].text4, { numPhotos: 100 }, locale)}
          </Text>
        </Stack>
      </Stack>
    );
  };
  return (
    <FormatIntlProvider>
      <App />
    </FormatIntlProvider>
  );
}

declare global {
  interface CountryBasedFormatOptions {
    FR: CountryBasedFormat;
    ES: CountryBasedFormat;
  }
}

export const CustomCountryBasedFormatOptions: StoryFn<typeof FormatIntlProvider> = (args) => {
  const App = () => {
    const { dateIntl, timeZone, setTimeZone, setCountryBasedFormatKey, countryBasedFormatKey, countryBasedFormatKeys } =
      useFormatIntl();
    const currentDate = new Date();
    const add2Days = addDays(currentDate, 2);
    const tableColumns = [
      {
        id: 'dateFormat',
        label: 'Date Format',
      },
      {
        id: 'dateTimeFormat',
        label: 'Date Time Format',
      },
      {
        id: 'locale',
        label: 'Locale',
      },
      {
        id: 'timeZone',
        label: 'Time Zone',
      },
    ];
    const result: Record<string, string> = {
      dateFormat: dateIntl.dateFormat,
      dateTimeFormat: dateIntl.dateTimeFormat,
      timeZone: dateIntl.timeZone || 'undefined',
      locale: dateIntl.locale?.code?.toString() || 'undefined',
    };

    return (
      <Stack>
        <Heading as="h2">Date Formatter</Heading>

        <HStack justifyContent="between" gap="12">
          <Select
            label="Select a Country"
            value={countryBasedFormatKey}
            options={countryBasedFormatKeys}
            onValueChange={(value: CountryBasedFormatOptionKey) => {
              setCountryBasedFormatKey(value);
            }}
          />
          <Combobox
            label="Select a TimeZone"
            className="w-1/2"
            value={timeZone}
            options={[...TIME_ZONE_LISTS]}
            onValueChange={(value) => {
              setTimeZone(value as TimeZone);
            }}
          />
        </HStack>
        <Heading as="h5" mt="5">
          Format Value
        </Heading>
        <TableLayout>
          <THead>
            <TR className="m-0 border-t border-slate-300 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
              {tableColumns.map((column) => (
                <TH
                  key={column.id}
                  className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {column.label}
                </TH>
              ))}
            </TR>
          </THead>
          <TBody>
            <TR className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
              {tableColumns.map((column) => (
                <TD
                  key={column.id}
                  className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {result[column.id]}
                </TD>
              ))}
            </TR>
          </TBody>
        </TableLayout>
        <VStack>
          <UL>
            <LI>
              <Strong>Override Default Format</Strong>(Today) -
              {dateIntl.format(currentDate, { dateFormat: 'dd/MM/yyyy HH:mm:ss a' })}
            </LI>
            <LI>
              <Strong>Format Date</Strong>(Today) - {dateIntl.formatDate(currentDate)}
            </LI>
            <LI>
              <Strong>Format Date Time</Strong>(Today) - {dateIntl.formatDateTime(currentDate)}
            </LI>
            <LI>
              <Strong>Format Relative Time</Strong>(Today) - {dateIntl.formatRelativeTime(currentDate)}
            </LI>
            <LI>
              <Strong>Given</Strong>(Today) - {dateIntl.formatDateTime(dateIntl.given(currentDate))}
            </LI>
            <LI>
              <Strong>Past</Strong>(Past Day from today) - {dateIntl.formatDateTime(dateIntl.past())}
            </LI>
            <LI>
              <Strong>Now</Strong>(Current Date) - {dateIntl.formatDateTime(dateIntl.now())}
            </LI>
            <LI>
              <Strong>Future</Strong>(Future Day from today) - {dateIntl.formatDateTime(dateIntl.future())}
            </LI>
            <LI>
              <Strong>IsValid</Strong> - {dateIntl.isValid(currentDate).toString()}
            </LI>
            <LI>
              <Strong>IsSameDay</Strong> - {dateIntl.isSameDay(currentDate, new Date()).toString()}
            </LI>
            <LI>
              <Strong>Range</Strong>(MinDate - {currentDate.toLocaleDateString()}, MaxDate:{' '}
              {add2Days.toLocaleDateString()}) - {dateIntl.formatDateTime(dateIntl.range(currentDate, add2Days))}
            </LI>
          </UL>
        </VStack>
      </Stack>
    );
  };

  return (
    <FormatIntlProvider {...args}>
      <App />
    </FormatIntlProvider>
  );
};

CustomCountryBasedFormatOptions.args = {
  dateFormat: 'dd/MM/yyyy',
  dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
  countryBasedFormatKey: 'FR',
  countryBasedFormatOptions: {
    FR: {
      locale: 'fr',
      currency: 'EUR',
      timeZone: 'CET',
    },
    ES: {
      locale: 'es',
      currency: 'EUR',
      timeZone: 'CET',
    },
  },
};
