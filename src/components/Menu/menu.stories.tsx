import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Menu from './index';

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
      <Menu.Item index="0">Active</Menu.Item>
      <Menu.Item index="1">Disabled</Menu.Item>
      <Menu.Item index="2">Item 3</Menu.Item>
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
      <Menu.Item index="0">Active</Menu.Item>
      <Menu.Item index="1">Disabled</Menu.Item>
      <Menu.Item index="2">Item 3</Menu.Item>
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
      <Menu.Item index="0" disabled>
        Disabled
      </Menu.Item>
      <Menu.Item index="1">Item 2</Menu.Item>
      <Menu.Item index="2">Item 3</Menu.Item>
    </Menu>
  ),
};

export const SubMenu: StoryObj<typeof Menu> = {
  args: {
    defaultIndex: '0',
    onSelect: () => console.log('onSelect'),
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Item index="0" disabled>
        Disabled
      </Menu.Item>
      <Menu.Item index="1">Item 2</Menu.Item>
      <Menu.Item index="2">Item 3</Menu.Item>
      <Menu.SubMenu title="SubMenu">
        <Menu.Item index="3">Item 4</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ),
};
