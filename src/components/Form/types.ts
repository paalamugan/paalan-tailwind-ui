import type { ColorVariant } from '@/constants';
import type { ReactNode } from 'react';
import type { CheckboxGroupProps } from '../CheckboxGroup/CheckboxGroup';
import type { ComboboxProps } from '../Combobox';
import type { DatePickerProps } from '../DatePicker';
import type { DateRangePickerProps } from '../DateRangePicker';
import type { MultiSelectProps } from '../MultiSelect';
import type { RadioGroupProps } from '../RadioGroup';
import type { SelectOption } from '../Select/types';

interface CommonFormItemField {
  name: string;
  label: string;
  description?: ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inline?: boolean;
  formItemClassName?: string;
}

export interface FormItemInputField extends CommonFormItemField {
  type: 'input';
  autoComplete?: 'off' | 'on';
}

export interface FormItemNumberInputField extends CommonFormItemField {
  type: 'number';
  autoComplete?: 'off' | 'on';
}

export interface FormItemTextAreaField extends CommonFormItemField {
  type: 'textarea';
  autoComplete?: 'off' | 'on';
}

export interface FormItemCheckboxField extends Omit<CommonFormItemField, 'placeholder'> {
  type: 'checkbox';
  variant?: ColorVariant;
}
export interface FormItemRadioGroupField extends Omit<CommonFormItemField, 'placeholder'> {
  type: 'radio-group';
  options: RadioGroupProps['options'];
  radioInline?: boolean;
  labelClassName?: string;
  swapRight?: boolean;
  variant?: ColorVariant;
}
export interface FormItemCheckboxGroupField extends Omit<CommonFormItemField, 'placeholder'> {
  type: 'checkbox-group';
  options: CheckboxGroupProps['options'];
  checkboxInline?: boolean;
  labelClassName?: string;
  swapRight?: boolean;
  variant?: ColorVariant;
}

export interface FormItemSelectField extends Omit<CommonFormItemField, 'className'> {
  type: 'select';
  options: SelectOption[];
  triggerClassName?: string;
  contentClassName?: string;
}
export interface FormItemMultiSelectField extends Omit<CommonFormItemField, 'className'> {
  type: 'multi-select';
  options: MultiSelectProps['options'];
  triggerClassName?: MultiSelectProps['triggerClassName'];
  contentClassName?: MultiSelectProps['contentClassName'];
  commandClassName?: MultiSelectProps['commandClassName'];
}

export interface FormItemComboboxField extends Omit<CommonFormItemField, 'className'> {
  type: 'combobox';
  options: ComboboxProps['options'];
  triggerClassName?: ComboboxProps['triggerClassName'];
  contentClassName?: ComboboxProps['contentClassName'];
  commandClassName?: ComboboxProps['commandClassName'];
}

export interface FormDatePickerField extends CommonFormItemField, Omit<DatePickerProps, 'label'> {
  type: 'date-picker';
}

export interface FormDateRangePickerField extends CommonFormItemField, Omit<DateRangePickerProps, 'label'> {
  type: 'date-range-picker';
}

export type FormItemField =
  | FormItemInputField
  | FormItemNumberInputField
  | FormItemTextAreaField
  | FormItemSelectField
  | FormItemCheckboxField
  | FormItemMultiSelectField
  | FormItemRadioGroupField
  | FormItemCheckboxGroupField
  | FormItemComboboxField
  | FormDatePickerField
  | FormDateRangePickerField;
