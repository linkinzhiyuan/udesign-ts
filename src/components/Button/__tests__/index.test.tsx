import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../index';
import '@testing-library/jest-dom';
// import { resetWarned } from 'rc-util/lib/warning';
import mountTest from '../../../tests/mountTest';
// import rtlTest from '../../../tests/rtlTest';
describe('Button', () => {
  // Mount tests
  mountTest(Button);
  mountTest(() => <Button size="large" />);
  mountTest(() => <Button size="small" />);

  // RTL tests  
  // rtlTest(Button);
  // rtlTest(() => <Button size="large" />);
  // rtlTest(() => <Button size="small" />);

  it('renders basic button correctly', () => {
    const { container } = render(<Button>Test Button</Button>);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container?.firstChild).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders different button types', () => {
    const { rerender } = render(<Button type="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('ud-btn-primary');

    // rerender(<Button type="dashed">Dashed</Button>);
    // expect(screen.getByText('Dashed')).toHaveClass('ud-btn-dashed');

    rerender(<Button type="link">Link</Button>);
    expect(screen.getByText('Link')).toHaveClass('ud-btn-link');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="large">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('ud-btn-large');

    rerender(<Button size="small">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('ud-btn-small');
  });

  it('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('ud-btn-disabled');
  });

  // it('renders loading state', () => {
  //   render(<Button loading>Loading</Button>);
  //   expect(screen.getByText('Loading')).toHaveClass('ud-btn-loading');
  // });

  // it('renders block button', () => {
  //   render(<Button block>Block Button</Button>);
  //   expect(screen.getByText('Block Button')).toHaveClass('ud-btn-block');
  // });

  // it('renders danger button', () => {
  //   render(<Button danger>Danger</Button>);
  //   expect(screen.getByText('Danger')).toHaveClass('ud-btn-dangerous');
  // });

  it('has static property for type detecting', () => {
    expect(Button.__ANT_BUTTON).toBe(true);
  });

  it('mounts correctly', () => {
    expect(() => render(<Button>Follow</Button>)).not.toThrow();
  });

  // it('warns for invalid size prop', () => {
  //   resetWarned();
  //   const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  //   render(<Button size="invalid" />);
  //   expect(errorSpy).toHaveBeenCalledWith(
  //     expect.stringContaining('[antd: Button] Invalid prop `size`')
  //   );

  //   errorSpy.mockRestore();
  // })
});
