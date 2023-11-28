/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import type { FormItemField } from '../Form/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../Button';
import { Form } from '../Form';
import { Label } from '../Label';
import { toast } from '../Toast';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => <Textarea {...args} />,
  args: {
    placeholder: 'Type your message here.',
  },
};

export const Disabled: Story = {
  render: (args) => <Textarea {...args} />,
  args: {
    ...Default.args,
    disabled: true,
  },
};
export const WithRows: Story = {
  render: (args) => <Textarea {...args} />,
  args: {
    ...Default.args,
    rows: 10,
  },
};

export const WithLabel: Story = {
  args: { ...Default.args, label: 'Your Message' },
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

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea {...args} id="message-2" />
      <p className="text-sm text-slate-500">Your message will be copied to the support team.</p>
    </div>
  ),
  args: { ...Default.args },
};

export const WithButton: Story = {
  render: (args) => (
    <div className="grid w-full gap-2">
      <Textarea {...args} />
      <Button>Send message</Button>
    </div>
  ),
  args: { ...Default.args },
};

export const WithFormTextarea: Story = {
  render: (args) => {
    const formSchema = z.object({
      bio: z
        .string({
          required_error: 'Bio is required.',
        })
        .min(10, {
          message: 'Bio must be at least 10 characters.',
        })
        .max(160, {
          message: 'Bio must not be longer than 30 characters.',
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    };

    const fields: FormItemField[] = [
      {
        name: 'bio',
        type: 'textarea',
        className: 'resize-none',
        placeholder: args.placeholder || '',
        description: 'You can @mention other users and organizations.',
        label: 'Bio',
      },
    ];
    return <Form form={form} fields={fields} onSubmit={onSubmit} className="w-2/3" />;
  },
  args: {
    placeholder: 'Tell us a little bit about yourself',
  },
};
