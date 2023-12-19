/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { CalendarIcon } from '@/icons';
import { cn } from '@/utils/helper';

import { Button } from '../Button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormProvider } from '../Form';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../Popover';
import { toast } from '../Toast';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: 'The type of calendar.',
      control: 'radio',
      options: ['single'],
    },
    selected: {
      description: 'The selected date.',
      table: {
        disable: true,
      },
    },
    onSelect: {
      description: 'Callback when a date is selected.',
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: (args) => {
    const [date, setDate] = useState(new Date());
    return (
      <Calendar
        {...args}
        selected={date}
        mode="single"
        onSelect={(date, selectedDate, activeModifiers, e) => {
          setDate(selectedDate);
          if (args.mode === 'single') {
            args.onSelect?.(date, selectedDate, activeModifiers, e);
          }
        }}
      />
    );
  },
  args: {
    mode: 'single',
    selected: new Date(),
    className: 'rounded-md border shadow',
  },
};

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export const Form: Story = {
  render: () => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    };

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <PopoverRoot>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </PopoverRoot>
                <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    );
  },
};
