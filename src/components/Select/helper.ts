import type { SelectOption, SelectOptionGroupType } from './types';

export const isSelectOptionGroup = (option: SelectOption): option is SelectOptionGroupType => {
  return Object.hasOwnProperty.call(option, 'options');
};
