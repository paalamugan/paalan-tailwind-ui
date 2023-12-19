/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '../Button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormProvider } from '../Form';
import { toast } from '../Toast';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'item-1', label: 'Option 1' },
      { value: 'item-2', label: 'Option 2' },
      { value: 'item-3', label: 'Option 3' },
    ],
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Basic: Story = {
  args: {
    searchPlaceholder: 'Search a item...',
    placeholder: 'Select an item...',
    className: 'w-[300px]',
    contentClassName: 'w-[300px]',
  },
};

export const WithLabel: Story = {
  args: {
    ...Basic.args,
    label: 'Label',
  },
};

export const WithInvalidWithoutMessage: Story = {
  args: {
    ...WithLabel.args,
    isInvalid: true,
  },
};

export const WithErrorMessage: Story = {
  args: { ...WithInvalidWithoutMessage.args, errorMessage: 'This field is required.' },
};

export const WithFilterByBoth: Story = {
  args: {
    ...WithLabel.args,
    label: 'Filter By Label and Value',
    filterBy: 'both',
  },
};

export const WithCustomFilterFn: Story = {
  args: {
    ...WithLabel.args,
    label: 'Custom Filter By Label',
    filter: (option, value) => option.label.includes(value),
  },
};

export const WithInline: Story = {
  args: {
    ...WithLabel.args,
    inline: true,
  },
};

export const WithInlineRequired: Story = {
  args: {
    ...WithInline.args,
    required: true,
  },
};

export const Form: Story = {
  render: (args) => {
    const FormSchema = z.object({
      language: z.string({
        required_error: 'Please select a language.',
      }),
    });
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        language: '',
      },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Combobox {...args} {...field} />
                  </FormControl>
                  <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    );
  },
  args: {
    options: [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Spanish', value: 'es' },
      { label: 'Portuguese', value: 'pt' },
      { label: 'Russian', value: 'ru' },
      { label: 'Japanese', value: 'ja' },
      { label: 'Korean', value: 'ko' },
      { label: 'Chinese', value: 'zh' },
    ],
    placeholder: 'Select a language...',
    searchPlaceholder: 'Search a language...',
    emptyOptionMessage: 'No language found.',
  },
};
