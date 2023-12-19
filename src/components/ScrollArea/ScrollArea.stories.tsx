import { Fragment } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from '../Separator';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const Basic: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-slate-100 dark:border-slate-700">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
  args: {},
};

export const Demo: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et enim voluptas dolorum illum! Nisi aut saepe
      incidunt harum quasi accusantium possimus suscipit et ut quibusdam hic ex velit, est minima quia quod explicabo
      reiciendis natus. Maxime at voluptates error fuga nesciunt odit cupiditate sit dicta quia ad eos repellat
      inventore consectetur, neque commodi vel illo quod laboriosam, veniam tempora! Ex aspernatur non nihil atque,
      magni praesentium fugit saepe quaerat odit aut, officiis molestiae inventore quam eum perferendis adipisci ducimus
      velit voluptates delectus consequatur pariatur? Impedit illum corporis, quia quod deleniti consequuntur repellat,
      sapiente quam deserunt quos doloribus id officiis inventore obcaecati dolores distinctio neque rem vel sunt dolor.
      Quia voluptatem vitae pariatur consequuntur exercitationem dolorum fugiat laudantium non. Velit, maxime. Eaque a
      consequatur nostrum cumque blanditiis natus aspernatur doloremque exercitationem vero ab quas voluptatibus odio,
      cum quisquam minima, itaque dicta? Impedit quaerat, obcaecati, optio ex veniam odio dolor quia quis natus velit
      quibusdam dolores autem sed voluptatibus illum reiciendis. Perferendis nemo placeat ducimus sed illum officiis
      numquam ea consectetur neque animi quia laboriosam quos, sequi autem. Fugit eaque vitae alias. Quas doloribus eum
      aut, vero quod magnam soluta officia doloremque dolor nobis quam ad at quasi velit numquam incidunt alias
      recusandae sint commodi harum similique culpa maiores deserunt. Enim officia porro sint officiis obcaecati beatae
      ipsum illo dolores laudantium quam possimus, saepe aliquid voluptas a dolore fugiat assumenda iusto. Odit sit
      officia aperiam earum distinctio molestias magni sapiente at qui explicabo nisi, autem et dolores veritatis iure,
      consequatur quo? Iusto ab, inventore pariatur necessitatibus culpa voluptates assumenda voluptatem id molestias
      fugiat impedit rem cum commodi temporibus veniam minus sunt deleniti animi laudantium accusamus rerum facere
      exercitationem beatae. Odio neque quisquam tempore? Magni porro ad et totam, pariatur dignissimos ut fugit hic id
      minus! Nesciunt possimus amet voluptatibus eum ab suscipit commodi maxime laboriosam modi rem similique, autem est
      hic et dolorem enim neque fuga itaque quam eaque. Dignissimos consectetur hic dolor ullam exercitationem ad
      ducimus repellat eveniet provident distinctio ex, aperiam quod assumenda, nihil aliquid, unde suscipit. Nesciunt
      commodi vero assumenda sed facere molestias laudantium rem iste aliquid nostrum qui, porro nam in possimus quos
      quod beatae, illum explicabo nulla? Sed accusamus quibusdam aspernatur nobis optio architecto nostrum iusto modi
      laudantium! Unde, blanditiis delectus hic tenetur est commodi nisi velit voluptatem asperiores nemo, aperiam
      impedit quos omnis cumque incidunt consequatur possimus voluptate provident illo. Debitis atque incidunt ratione
      eius.
    </ScrollArea>
  ),
  args: {},
};
