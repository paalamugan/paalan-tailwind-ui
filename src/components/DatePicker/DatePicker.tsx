import React from 'react';

import { XCircleIcon } from '@heroicons/react/24/outline';
import { addDays, format } from 'date-fns';

import { Button } from '@/components/Button';
import { Calendar } from '@/components/Calendar';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/Popover';
import { CalendarIcon } from '@/icons/custom';
import { Box } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from '../Select';

export interface DatePickerProps {
  /**
   * The selected date.
   */
  date?: Date | string;
  /**
   * Callback when the selected date changes.
   */
  onDateChange?: (date: Date | undefined) => void;
  /**
   * Additional class names to apply to the date picker.
   */
  className?: string;
  /**
   * Label for the date picker.
   */
  label?: string;
  /**
   * Placeholder text for the date picker.
   */
  placeholder?: string;
  /**
   * Date format to use
   */
  dateFormat?: string;
  /**
   * Placeholder text for the presets.
   */
  presetPlaceholder?: string;
  /**
   * Preset values to show.
   * value is the number of days to add to the current date.
   */
  presets?: {
    label: string;
    value: number;
  }[];
  /**
   * required or not
   */
  required?: boolean;
  /**
   * Whether the checkbox is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * whether the checkbox is invalid
   */
  isInvalid?: boolean;

  /**
   *  id for the date picker
   */
  id?: string;
  /**
   * The error message for the checkbox
   */
  errorMessage?: string;
  /**
   * Parent class name for the date picker
   */
  parentClassName?: string;
}

const PresetCalendar: React.FC<Pick<DatePickerProps, 'presets' | 'presetPlaceholder' | 'date' | 'onDateChange'>> = ({
  presets,
  date,
  onDateChange,
  presetPlaceholder = 'Select',
}) => {
  const selectedDate = typeof date === 'string' ? new Date(date) : date;
  return (
    <>
      <SelectRoot onValueChange={(value) => onDateChange?.(addDays(new Date(), parseInt(value)))}>
        <SelectTrigger>
          <SelectValue placeholder={presetPlaceholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {(presets || []).map((preset) => (
            <SelectItem key={preset.value} value={`${preset.value}`}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <div className="rounded-md border">
        <Calendar mode="single" selected={selectedDate} onSelect={onDateChange} />
      </div>
    </>
  );
};

/**
 *  A date picker component with range and presets.
 */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date: value,
      onDateChange: onValueChange,
      label,
      className,
      parentClassName,
      placeholder = 'Pick a date',
      dateFormat = 'PPP',
      presetPlaceholder,
      presets,
      isInvalid: invalid,
      required,
      id,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const selectedDate = React.useMemo(() => (typeof value === 'string' ? new Date(value) : value), [value]);
    const [date, setDate] = React.useState<Date | undefined>(selectedDate);
    const labelId = id || label?.toLowerCase().replace(/\s/g, '-');

    React.useEffect(() => {
      if (selectedDate) {
        setDate(selectedDate);
      }
    }, [selectedDate]);

    const onSelect = React.useCallback(
      (date: Date | undefined) => {
        setDate(date);
        onValueChange?.(date ? new Date(date) : undefined);
      },
      [onValueChange],
    );

    const isPreset = presets && presets.length > 0;

    return (
      <>
        <Box className={cn('flex flex-col gap-2', parentClassName)}>
          {label && (
            <Label htmlFor={labelId} required={required} isInvalid={isInvalid}>
              {label}
            </Label>
          )}
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button
                {...props}
                type="button"
                variant="outline"
                className={cn(
                  'min-w-[240px] justify-start text-left font-normal',
                  {
                    'text-muted-foreground': !date,
                    'border-danger text-danger hover:bg-background hover:text-danger focus:ring-danger/40': isInvalid,
                  },
                  className,
                )}
                wrapperClassName="justify-start"
                ref={ref}
                id={labelId}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, dateFormat) : <Box as="span">{placeholder}</Box>}
                {date && (
                  <XCircleIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(undefined);
                    }}
                    title="Clear date"
                    className={cn('ml-auto h-5 w-5 text-muted-foreground', {
                      'text-danger': isInvalid,
                    })}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(isPreset ? 'flex w-auto flex-col space-y-2 p-2' : 'w-auto p-0')}
              align="start"
            >
              {isPreset ? (
                <PresetCalendar
                  presets={presets}
                  date={date}
                  onDateChange={onSelect}
                  presetPlaceholder={presetPlaceholder}
                />
              ) : (
                <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus />
              )}
            </PopoverContent>
          </PopoverRoot>
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
