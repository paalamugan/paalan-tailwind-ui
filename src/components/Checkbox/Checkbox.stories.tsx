/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { COLOR_VARIANTS } from '@/constants';

import { Button } from '../Button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormProvider } from '../Form';
import { toast } from '../Toast';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      table: { disable: true },
    },
    variant: {
      options: COLOR_VARIANTS,
      control: { type: 'radio' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'terms',
    variant: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'terms1',
    label: 'Accept terms and conditions',
  },
};

export const WithIndeterminate: Story = {
  args: {
    ...WithLabel.args,
    indeterminate: true,
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

export const Disabled: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms2',
    disabled: true,
  },
};

export const SwapRight: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms3',
    swapRight: true,
  },
};

export const Required: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms4',
    required: true,
  },
};
export const WithSwapRightRequired: Story = {
  args: {
    ...Required.args,
    id: 'terms5',
    swapRight: true,
  },
};

export const SingleCheckBoxForm: Story = {
  render: () => {
    const SingleFormSchema = z.object({
      mobile: z.boolean().default(false).optional(),
    });
    const form = useForm<z.infer<typeof SingleFormSchema>>({
      resolver: zodResolver(SingleFormSchema),
      defaultValues: {
        mobile: true,
      },
    });

    const onSubmit = (data: z.infer<typeof SingleFormSchema>) => {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Use different settings for my mobile devices</FormLabel>
                  <FormDescription>
                    You can manage your mobile notifications in the{' '}
                    <Button variant="link" asChild className="px-1">
                      <a href="#">mobile settings</a>
                    </Button>
                    page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    );
  },
};

export const MultipleCheckBoxForm: Story = {
  render: () => {
    const items = [
      {
        id: 'recents',
        label: 'Recents',
      },
      {
        id: 'home',
        label: 'Home',
      },
      {
        id: 'applications',
        label: 'Applications',
      },
      {
        id: 'desktop',
        label: 'Desktop',
      },
      {
        id: 'downloads',
        label: 'Downloads',
      },
      {
        id: 'documents',
        label: 'Documents',
      },
    ] as const;
    const MultipleFormSchema = z.object({
      items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.',
      }),
    });
    const form = useForm<z.infer<typeof MultipleFormSchema>>({
      resolver: zodResolver(MultipleFormSchema),
      defaultValues: {
        items: ['recents', 'home'],
      },
    });

    const onSubmit = (data: z.infer<typeof MultipleFormSchema>) => {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                  <FormDescription>Select the items you want to display in the sidebar.</FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(field.value?.filter((value) => value !== item.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
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
