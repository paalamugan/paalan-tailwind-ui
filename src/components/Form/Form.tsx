import * as React from 'react';

import type * as LabelPrimitive from '@radix-ui/react-label';
import type { ControllerProps, FieldPath, FieldValues, Path, useForm } from 'react-hook-form';
import type { ButtonProps } from '../Button';
import type { FormItemField } from './types';

import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider as OriginalFormProvider, useFormContext } from 'react-hook-form';

import { Label } from '@/components/Label/Label';
import { ArrowPathIcon } from '@/icons';
import { Box } from '@/layouts';
import { cn } from '@/utils/helper';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { Combobox } from '../Combobox';
import { DatePicker } from '../DatePicker';
import { DateRangePicker } from '../DateRangePicker';
import { Input } from '../Input';
import { MultiSelect } from '../MultiSelect';
import { NumberInput } from '../NumberInput/NumberInput';
import { RadioGroup } from '../RadioGroup';
import { Select } from '../Select';
import { Textarea } from '../Textarea';

const FormProvider = OriginalFormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, required, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-danger', className)}
      htmlFor={formItemId}
      required={required}
      {...props}
    >
      {props.children}
    </Label>
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p ref={ref} id={formDescriptionId} className={cn('text-[0.8rem] text-muted-foreground', className)} {...props} />
    );
  },
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn('text-[0.8rem] font-medium text-danger', className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

interface FormComponentProps<TData extends FieldValues> {
  /**
   * The form object from react-hook-form
   */
  form: ReturnType<typeof useForm<TData>>;
  /**
   * The fields to render
   */
  fields: FormItemField[];
  /**
   * The callback when the form is submitted
   */
  onSubmit: (values: TData) => void;
  /**
   * The text to display on the submit button
   */
  submitText?: string;
  /**
   * The submit button component
   */
  submitButton?: React.ComponentType<{ loading: boolean }>;
  /**
   * The submit button variant
   */
  submitButtonVariant?: ButtonProps['variant'];
  /**
   * The submit button color
   */
  submitButtonColor?: ButtonProps['color'];
  /**
   * The class name for the submit button
   */
  submitClassName?: string;
  /**
   * The text to display on the reset button
   */
  resetText?: string;
  /**
   * The reset button component
   */
  resetButton?: React.ComponentType;
  /**
   * The reset button variant
   */
  resetButtonVariant?: ButtonProps['variant'];
  /**
   * The reset button color
   */
  resetButtonColor?: ButtonProps['color'];
  /**
   * The class name for the reset button
   */
  resetClassName?: string;
  /**
   * The class name for the form element
   */
  className?: string;
  /**
   * The parent class name for reset and submit buttons
   */
  actionClassName?: string;
  /**
   * Whether to hide the reset button
   */
  hideResetButton?: boolean;
  /**
   * Whether to hide the submit button
   */
  hideSubmitButton?: boolean;
  /**
   * Whether to display the form inline
   */
  inline?: boolean;
}

const Form = <TData extends FieldValues>({
  form,
  onSubmit,
  fields,
  className,
  submitText = 'Submit',
  submitButton: SubmitButton,
  submitButtonVariant = 'solid',
  submitButtonColor = 'primary',
  submitClassName,
  resetText = 'Reset',
  resetButton: ResetButton,
  resetButtonVariant = 'outline',
  resetButtonColor,
  resetClassName,
  actionClassName,
  hideResetButton = false,
  hideSubmitButton = false,
  inline: formInline,
}: FormComponentProps<TData>) => {
  const inlineTypes = ['checkbox'];
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
        {fields.map(({ required, label, inline, formItemClassName, ...item }) => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name as Path<TData>}
            render={({ field }) => (
              <FormItem className={formItemClassName}>
                <div
                  className={cn('flex flex-col gap-2', {
                    'flex-row items-center': inline || formInline || inlineTypes.includes(item.type),
                  })}
                >
                  <FormLabel
                    required={required}
                    htmlFor={field.name}
                    className={cn({
                      'w-[9rem] min-w-[9rem] break-all': formInline && !inlineTypes.includes(item.type),
                      'order-1': inlineTypes.includes(item.type),
                    })}
                  >
                    {label}
                  </FormLabel>

                  <>
                    {item.type === 'input' && (
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder={item.placeholder}
                          disabled={item.disabled}
                          className={item.className}
                          autoComplete={item.autoComplete}
                        />
                      </FormControl>
                    )}
                    {item.type === 'number' && (
                      <FormControl>
                        <NumberInput
                          {...field}
                          id={field.name}
                          {...item}
                          value={field.value ?? ''}
                          onChange={(event) => {
                            const value = event.currentTarget.valueAsNumber;
                            field.onChange(Number.isNaN(value) ? undefined : value);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'select' && (
                      <FormControl>
                        <Select
                          {...field}
                          id={field.name}
                          {...item}
                          onValueChange={(value) => {
                            field.onChange(value || undefined);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'checkbox' && (
                      <FormControl>
                        <Checkbox
                          {...field}
                          id={field.name}
                          {...item}
                          type={'button'}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'checkbox-group' && (
                      <FormControl>
                        <CheckboxGroup
                          {...field}
                          className={item.className}
                          inline={item.checkboxInline}
                          options={item.options}
                          labelClassName={item.labelClassName}
                          variant={item.variant}
                          swapRight={item.swapRight}
                          selectedValues={field.value?.length ? field.value : undefined}
                          onSelectedValueChange={(values) => {
                            field.onChange(values.length ? values : undefined);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'radio-group' && (
                      <FormControl>
                        <RadioGroup
                          {...field}
                          id={field.name}
                          className={item.className}
                          inline={item.radioInline}
                          options={item.options}
                          labelClassName={item.labelClassName}
                          variant={item.variant}
                          swapRight={item.swapRight}
                          onValueChange={(value) => {
                            field.onChange(value || undefined);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'textarea' && (
                      <FormControl>
                        <Textarea {...field} id={field.name} {...item} />
                      </FormControl>
                    )}
                    {item.type === 'combobox' && (
                      <FormControl>
                        <Combobox
                          {...field}
                          {...item}
                          onValueChange={(value) => {
                            field.onChange(value || undefined);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'multi-select' && (
                      <FormControl>
                        <MultiSelect
                          {...field}
                          {...item}
                          selectedValues={field.value?.length ? field.value : undefined}
                          onSelectedValueChange={(values) => {
                            field.onChange(values.length ? values : undefined);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'date-picker' && (
                      <FormControl>
                        <DatePicker
                          {...field}
                          {...item}
                          date={field.value}
                          onDateChange={(value) => {
                            field.onChange(value || undefined);
                          }}
                        />
                      </FormControl>
                    )}
                    {item.type === 'date-range-picker' && (
                      <FormControl>
                        <DateRangePicker
                          {...field}
                          {...item}
                          dateRange={field.value}
                          onDateRangeChange={(value) => {
                            field.onChange(value || undefined);
                          }}
                        />
                      </FormControl>
                    )}
                  </>
                </div>
                {item.description && (
                  <FormDescription
                    className={cn({
                      'pl-[calc(9rem+0.5rem)]': formInline,
                    })}
                  >
                    {item.description}
                  </FormDescription>
                )}
                <FormMessage
                  className={cn({
                    'pl-[calc(9rem+0.5rem)]': formInline,
                  })}
                />
              </FormItem>
            )}
          />
        ))}
        <Box className={cn('flex gap-3 pt-2', actionClassName)}>
          {ResetButton ? (
            <ResetButton />
          ) : (
            !hideResetButton && (
              <Button
                type="reset"
                variant={resetButtonVariant}
                color={resetButtonColor}
                onClick={() => {
                  form.reset();
                }}
                className={resetClassName}
              >
                {resetText}
              </Button>
            )
          )}
          {SubmitButton ? (
            <SubmitButton loading={form.formState.isSubmitting} />
          ) : (
            !hideSubmitButton && (
              <Button
                type="submit"
                variant={submitButtonVariant}
                color={submitButtonColor}
                disabled={form.formState.isSubmitting}
                className={submitClassName}
              >
                {form.formState.isSubmitting && <ArrowPathIcon className="h-4 w-4 animate-spin" />}
                {submitText}
              </Button>
            )
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

Form.displayName = 'Form';

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormProvider, useFormField };
