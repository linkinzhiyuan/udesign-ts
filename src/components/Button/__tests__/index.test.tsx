import React, { Component } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../index'; // 假设 Button 组件位于同一目录下
import '@testing-library/jest-dom';


// import { SearchOutlined } from '@ant-design/icons';
import { resetWarned } from 'rc-util/lib/warning';
// import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import rtlTest from '../../../tests/rtlTest';
// import { fireEvent, render, sleep } from '../../../tests/utils';
// import ConfigProvider from '../../config-provider';

describe('Button Component', () => {
  it('renders correctly and responds to click events', () => {
    // 创建一个模拟的点击处理函数
    const handleClick = jest.fn();

    // 渲染 Button 组件
    render(<Button onClick={handleClick}>Click Me</Button>);

    // 查找按钮元素
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // 验证按钮是否在文档中
    expect(buttonElement).toBeInTheDocument();

    // 模拟点击事件
    fireEvent.click(buttonElement);

    // 验证点击处理函数是否被调用
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button', () => {
  mountTest(Button);
  mountTest(() => <Button size="large" />);
  mountTest(() => <Button size="small" />);
  // mountTest(Button.Group);
  // mountTest(() => <Button.Group size="large" />);
  // mountTest(() => <Button.Group size="small" />);
  // mountTest(() => <Button.Group size="middle" />);

  rtlTest(Button);
  rtlTest(() => <Button size="large" />);
  rtlTest(() => <Button size="small" />);
  // rtlTest(Button.Group);
  // rtlTest(() => <Button.Group size="large" />);
  // rtlTest(() => <Button.Group size="small" />);
  // rtlTest(() => <Button.Group size="middle" />);

  // it('renders correctly', () => {
  //   const { container } = render(<Button>Follow</Button>);
  //   expect(container.firstChild).toMatchSnapshot();
  // });

  it('mount correctly', () => {
    expect(() => render(<Button>Follow</Button>)).not.toThrow();
  });

  // it('warns if size is wrong', () => {
  //   resetWarned();
  //   const mockWarn = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   const size = 'who am I';
  //   // @ts-expect-error: Type '"who am I"' is not assignable to type 'SizeType'.ts(2322)
  //   render(<Button.Group size={size} />);
  //   expect(mockWarn).toHaveBeenCalledWith('Warning: [antd: Button.Group] Invalid prop `size`.');

  //   mockWarn.mockRestore();
  // });

  // it('renders Chinese characters correctly', () => {
  //   expect(render(<Button>按钮</Button>).container.firstChild).toMatchSnapshot();
  //   // should not insert space when there is icon
  //   expect(
  //     render(<Button icon={<SearchOutlined />}>按钮</Button>).container.firstChild,
  //   ).toMatchSnapshot();
  //   // should not insert space when there is icon
  //   expect(
  //     render(
  //       <Button>
  //         <SearchOutlined />
  //         按钮
  //       </Button>,
  //     ).container.firstChild,
  //   ).toMatchSnapshot();
  //   // should not insert space when there is icon
  //   expect(
  //     render(<Button icon={<SearchOutlined />}>按钮</Button>).container.firstChild,
  //   ).toMatchSnapshot();
  //   // should not insert space when there is icon while loading
  //   expect(
  //     render(
  //       <Button icon={<SearchOutlined />} loading>
  //         按钮
  //       </Button>,
  //     ).container.firstChild,
  //   ).toMatchSnapshot();
  //   // should insert space while loading
  //   expect(render(<Button loading>按钮</Button>).container.firstChild).toMatchSnapshot();

  //   // should insert space while only one nested element
  //   expect(
  //     render(
  //       <Button>
  //         <span>按钮</span>
  //       </Button>,
  //     ).container.firstChild,
  //   ).toMatchSnapshot();
  // });

  // it('renders Chinese characters correctly in HOC', () => {
  //   const Text = ({ children }: { children: React.ReactNode }) => <span>{children}</span>;
  //   const { container, rerender } = render(
  //     <Button>
  //       <Text>按钮</Text>
  //     </Button>,
  //   );
  //   expect(container.querySelector('.ant-btn')).toHaveClass('ant-btn-two-chinese-chars');

  //   rerender(
  //     <Button>
  //       <Text>大按钮</Text>
  //     </Button>,
  //   );
  //   expect(container.querySelector('.ant-btn')).not.toHaveClass('ant-btn-two-chinese-chars');

  //   rerender(
  //     <Button>
  //       <Text>按钮</Text>
  //     </Button>,
  //   );
  //   expect(container.querySelector('.ant-btn')).toHaveClass('ant-btn-two-chinese-chars');
  // });

  // // https://github.com/ant-design/ant-design/issues/18118
  // it('should not insert space to link or text button', () => {
  //   const wrapper1 = render(<Button type="link">按钮</Button>);
  //   expect(wrapper1.getByRole('button')).toHaveTextContent('按钮');
  //   wrapper1.unmount();
  //   const wrapper2 = render(<Button type="text">按钮</Button>);
  //   expect(wrapper2.getByRole('button')).toHaveTextContent('按钮');
  // });

  // it('should render empty button without errors', () => {
  //   const wrapper = render(
  //     <Button>
  //       {null}
  //       {undefined}
  //     </Button>,
  //   );
  //   expect(wrapper.container.firstChild).toMatchSnapshot();
  // });

  it('have static property for type detecting', () => {
    expect(Button.__ANT_BUTTON).toBe(true);
  });

  // it('should warning when pass a string as icon props', () => {
  //   resetWarned();
  //   const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  //   render(<Button type="primary" icon="ab" />);
  //   expect(warnSpy).not.toHaveBeenCalled();

  //   render(<Button type="primary" icon="search" />);
  //   expect(warnSpy).toHaveBeenCalledWith(
  //     `Warning: [antd: Button] \`icon\` is using ReactNode instead of string naming in v4. Please check \`search\` at https://ant.design/components/icon`,
  //   );

  //   warnSpy.mockRestore();
  // });

  // it('should warning when pass type=link and ghost=true', () => {
  //   resetWarned();
  //   const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   render(<Button type="link" ghost />);
  //   expect(warnSpy).toHaveBeenCalledWith(
  //     "Warning: [antd: Button] `link` or `text` button can't be a `ghost` button.",
  //   );
  //   warnSpy.mockRestore();
  // });

  // it('should warning when pass type=text and ghost=true', () => {
  //   resetWarned();
  //   const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   render(<Button type="text" ghost />);
  //   expect(warnSpy).toHaveBeenCalledWith(
  //     "Warning: [antd: Button] `link` or `text` button can't be a `ghost` button.",
  //   );
  //   warnSpy.mockRestore();
  // });


});
