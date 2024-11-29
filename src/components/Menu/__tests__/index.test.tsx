/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, RenderResult,screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu, { MenuProps} from "../menu";
import MenuItem from "../menuItem";
import mountTest from '../../../tests/mountTest';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn(),
  className: 'test'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index='0'>active</MenuItem>
      <MenuItem index='1' disabled>disabled</MenuItem>
      <MenuItem index='2'>xyz</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
mountTest(Menu);
mountTest(MenuItem);
describe('test Menu and MenuItem component in default horizontal mode', () => {

  it('should render', () => {
    wrapper = render(generateMenu(testProps));
    menuElement = screen.getByTestId('test-menu')
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
    expect(menuElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('is-active');
    expect(disabledElement).toHaveClass('is-disabled');
  });

  it('click item should change active and call the right callback', () => {
    wrapper = render(generateMenu(testProps));
    menuElement = screen.getByTestId('test-menu')
    activeElement = screen.getByText('active')
    const thirdElement = screen.getByText('xyz')
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalled();

    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    expect(activeElement).not.toHaveClass('is-active');
  });
});

describe('test Menu and MenuItem component in vertical mode', () => {
  it('should render vertical mode', () => {
    wrapper = render(generateMenu(testVerProps));
    menuElement = screen.getByTestId('test-menu')
    expect(menuElement).toHaveClass('is-vertical');
  });
});
