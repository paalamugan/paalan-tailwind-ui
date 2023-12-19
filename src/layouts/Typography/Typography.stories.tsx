import type { Meta, StoryObj } from '@storybook/react';

import {
  BlockQuote,
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Large,
  Lead,
  LI,
  OL,
  P,
  Small,
  Strong,
  Subtle,
  TableLayout as Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  UL,
} from './Typography';

const meta: Meta = {
  title: 'Layouts/Typography',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj;

export const H1Story: Story = {
  name: 'H1',
  render: () => <H1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</H1>,
  args: {},
};

export const H2Story: Story = {
  name: 'H2',
  render: () => <H2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</H2>,
  args: {},
};

export const H3Story: Story = {
  name: 'H3',
  render: () => <H3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</H3>,
  args: {},
};

export const H4Story: Story = {
  name: 'H4',
  render: () => <H4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</H4>,
  args: {},
};

export const H5Story: Story = {
  name: 'H5',
  render: () => <H5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</H5>,
  args: {},
};

export const H6Story: Story = {
  name: 'H6',
  render: () => <H6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</H6>,
  args: {},
};

export const PStory: Story = {
  name: 'P',
  render: (args) => <P {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</P>,
  args: {},
};

export const BlockQuoteStory: Story = {
  name: 'BlockQuote',
  render: (args) => (
    <BlockQuote {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</BlockQuote>
  ),
  args: {},
};

export const TableStory: Story = {
  name: 'Table',
  render: () => (
    <div className="my-6 w-full overflow-y-auto">
      <Table className="w-full">
        <THead>
          <TR className="m-0 border-t border-slate-300 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
            <TH className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              King&apos;s Treasury
            </TH>
            <TH className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              People&apos;s happiness
            </TH>
          </TR>
        </THead>
        <TBody>
          <TR className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
            <TD className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Empty
            </TD>
            <TD className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Overflowing
            </TD>
          </TR>
          <TR className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
            <TD className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Modest
            </TD>
            <TD className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Satisfied
            </TD>
          </TR>
          <TR className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-600 dark:even:bg-slate-800">
            <TD className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Full
            </TD>
            <TD className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Ecstatic
            </TD>
          </TR>
        </TBody>
      </Table>
    </div>
  ),
  args: {},
};

export const ListULStory: Story = {
  name: 'List UL',
  render: () => (
    <UL className="my-6 ml-6 list-disc [&>li]:mt-2">
      <LI>1st level of puns: 5 gold coins</LI>
      <LI>2nd level of jokes: 10 gold coins</LI>
      <LI>3rd level of humor: 15 gold coins</LI>
    </UL>
  ),
  args: {},
};

export const ListOLStory: Story = {
  name: 'List OL',
  render: () => (
    <OL className="my-6 ml-6 list-decimal [&>li]:mt-2">
      <LI>1st level of puns: 5 gold coins</LI>
      <LI>2nd level of jokes: 10 gold coins</LI>
      <LI>3rd level of humor: 15 gold coins</LI>
    </OL>
  ),
  args: {},
};

export const CodeStory: Story = {
  name: 'Code',
  render: (args) => <Code {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</Code>,
  args: {},
};

export const LeadStory: Story = {
  name: 'Lead',
  render: (args) => <Lead {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</Lead>,
  args: {},
};

export const LargeStory: Story = {
  name: 'Large',
  render: (args) => <Large {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</Large>,
  args: {},
};

export const SmallStory: Story = {
  name: 'Small',
  render: (args) => <Small {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</Small>,
  args: {},
};

export const SubtleStory: Story = {
  name: 'Subtle',
  render: (args) => <Subtle {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</Subtle>,
  args: {},
};

export const StrongStory: Story = {
  name: 'Strong',
  render: (args) => <Strong {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim.</Strong>,
  args: {},
};
