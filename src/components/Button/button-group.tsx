import cls from 'classnames';
import React from 'react';
import { getPrefixCls } from './button';
import warning from '../_util/warning';

export interface ButtonGroupProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  size?: 'small' | 'middle' | 'large' | undefined;
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { className, prefixCls: customizePrefixCls, size, children, ...restProps } = props;

  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    case 'middle':
    case undefined:
      break;
    default:
      warning(!size, 'Button.Group', 'Invalid prop `size`.')
      
  }

  const prefixCls = getPrefixCls('btn-group', customizePrefixCls);

  const classes = cls(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
    },
    className
  )
  return (
    <div {...restProps} className={classes}>
      {children}
    </div>
  );
};

export default ButtonGroup;
