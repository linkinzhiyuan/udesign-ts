import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Menu  from './menu';
import MenuItem from './MenuItem';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof Menu> = {
  args: {
    defaultIndex: '0',
    onSelect: () => console.log('onSelect'),
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem index="0">Active</MenuItem>
      <MenuItem index="1">Disabled</MenuItem>
      <MenuItem index="2">Item 3</MenuItem>
    </Menu>
  ),
};

export const Vertical: StoryObj<typeof Menu> = {
  args: {
    mode: 'vertical',
    defaultIndex: '0',
    onSelect: () => console.log('onSelect'),
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem index="0">Active</MenuItem>
      <MenuItem index="1">Disabled</MenuItem>
      <MenuItem index="2">Item 3</MenuItem>
    </Menu>
  ),
};

export const Disabled: StoryObj<typeof Menu> = {
  args: {
    defaultIndex: '0',
    onSelect: () => console.log('onSelect'),
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem index="0" disabled>
        Disabled
      </MenuItem>
      <MenuItem index="1">Item 2</MenuItem>
      <MenuItem index="2">Item 3</MenuItem>
    </Menu>
  ),
};
