/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '../Button';
import { FormField, FormItem, FormLabel, FormMessage, FormProvider } from '../Form';
import { toast } from '../Toast';
import { MultiSelect } from './MultiSelect';

const options = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'wordpress',
    label: 'WordPress',
  },
  {
    value: 'express.js',
    label: 'Express.js',
  },
];
const meta: Meta<typeof MultiSelect> = {
  title: 'components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Basic: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(args.selectedValues || []);
    const handleChange = (values: string[]) => {
      setSelectedValues(values);
      args.onSelectedValueChange(values);
    };
    return <MultiSelect {...args} selectedValues={selectedValues} onSelectedValueChange={handleChange} />;
  },
  args: {
    options: options,
    selectedValues: ['next.js'],
    commandClassName: 'w-[560px]',
  },
};
export const WithLabel: Story = {
  ...Basic,
  args: {
    ...Basic.args,
    label: 'Select Frameworks',
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

export const WithLabelRequired: Story = {
  ...Basic,
  args: {
    ...WithLabel.args,
    required: true,
  },
};

export const WithInline: Story = {
  ...Basic,
  args: {
    ...WithLabel.args,
    inline: true,
  },
};

export const WithInlineRequired: Story = {
  ...Basic,
  args: {
    ...WithInline.args,
    required: true,
  },
};

export const Form: Story = {
  render: (args) => {
    const frameworkSchema = z.object({
      frameworks: z.array(z.string()),
    });

    const form = useForm({
      resolver: zodResolver(frameworkSchema),
      defaultValues: {
        frameworks: [],
      },
    });
    function onSubmit(data: z.infer<typeof frameworkSchema>) {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="frameworks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Frameworks</FormLabel>
                <MultiSelect
                  {...args}
                  selectedValues={field.value}
                  onSelectedValueChange={field.onChange}
                  commandClassName="sm:w-[510px]"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="float-right">
            Submit
          </Button>
        </form>
      </FormProvider>
    );
  },
  args: {
    options: [
      {
        value: 'next.js',
        label: 'Next.js',
      },
      {
        value: 'sveltekit',
        label: 'SvelteKit',
      },
      {
        value: 'nuxt.js',
        label: 'Nuxt.js',
      },
      {
        value: 'remix',
        label: 'Remix',
      },
      {
        value: 'astro',
        label: 'Astro',
      },
      {
        value: 'wordpress',
        label: 'WordPress',
      },
      {
        value: 'express.js',
        label: 'Express.js',
      },
    ],
  },
};
