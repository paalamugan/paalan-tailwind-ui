import type { OptionType } from '@/types';

export interface SelectOptionGroupType {
  label?: string;
  options: OptionType[];
}

export type SelectOption = OptionType | SelectOptionGroupType | string | number;
