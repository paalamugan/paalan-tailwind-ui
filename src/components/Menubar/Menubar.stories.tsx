import type { Meta, StoryObj } from '@storybook/react';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRoot,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './Menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Menubar>;

export const Basic: Story = {
  args: {
    menus: [
      {
        label: 'File',
        items: [
          {
            label: 'New Tab',
            shortcut: '⌘T',
          },
          {
            label: 'New Window',
            shortcut: '⌘N',
          },
          {
            label: 'New Incognito Window',
            disabled: true,
          },
          {
            separator: true,
          },
          {
            label: '',
            subMenus: [
              {
                label: 'Share',
                items: [
                  {
                    label: 'Email link',
                  },
                  {
                    label: 'Messages',
                  },
                  {
                    label: 'Notes',
                  },
                ],
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Print...',
            shortcut: '⌘P',
          },
        ],
      },
      {
        label: 'Edit',
        items: [
          {
            label: 'Undo',
            shortcut: '⌘Z',
          },
          {
            label: 'Redo',
            shortcut: '⇧⌘Z',
          },
          {
            separator: true,
          },
          {
            label: '',
            subMenus: [
              {
                label: 'Find',
                items: [
                  {
                    label: 'Search the web',
                  },
                  {
                    separator: true,
                  },
                  {
                    label: 'Find...',
                  },
                  {
                    label: 'Find Next',
                  },
                  {
                    label: 'Find Previous',
                  },
                ],
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cut',
          },
          {
            label: 'Copy',
          },
          {
            label: 'Paste',
          },
        ],
      },
      {
        label: 'View',
        items: [
          {
            label: 'Always Show Bookmarks Bar',
            type: 'checkbox',
          },
          {
            label: 'Always Show Full URLs',
            type: 'checkbox',
            checked: true,
          },
          {
            separator: true,
          },
          {
            label: 'Reload',
            shortcut: '⌘R',
            inset: true,
          },
          {
            label: 'Force Reload',
            shortcut: '⇧⌘R',
            disabled: true,
            inset: true,
          },
          {
            separator: true,
          },
          {
            label: 'Toggle Fullscreen',
            inset: true,
          },
          {
            separator: true,
          },
          {
            label: 'Hide Sidebar',
            inset: true,
          },
        ],
      },
      {
        label: 'Profiles',
        items: [
          {
            type: 'radio',
            value: 'benoit',
            options: [
              {
                label: 'Andy',
                value: 'andy',
              },
              {
                label: 'Benoit',
                value: 'benoit',
              },
              {
                label: 'Luis',
                value: 'luis',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Edit...',
            inset: true,
          },
          {
            separator: true,
          },
          {
            label: 'Add Profile...',
            inset: true,
          },
        ],
      },
    ],
  },
};

export const WithRawMenubar: Story = {
  render: (args) => (
    <MenubarRoot {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </MenubarRoot>
  ),
};
