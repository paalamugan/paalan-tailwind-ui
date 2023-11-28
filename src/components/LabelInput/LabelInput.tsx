import type { InputProps } from '../Input';

import { VStack } from '@/layouts';
import { cn, forwardRef } from '@/utils';

import { Input } from '../Input';
import { Label } from '../Label';

interface LabelInputProps extends InputProps {
  label: string;
}

const LabelInput = forwardRef<LabelInputProps, 'input'>(({ label, className, id, ...inputProps }, ref) => {
  const labelId = id || label;
  return (
    <VStack className={cn('gap-2', className)}>
      <Label htmlFor={labelId} text={label} required={inputProps.required} isInvalid={inputProps.isInvalid} />
      <Input {...inputProps} ref={ref} id={labelId} />
    </VStack>
  );
});
export { LabelInput };
