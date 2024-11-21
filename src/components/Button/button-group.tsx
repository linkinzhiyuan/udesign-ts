import cls from 'classnames';
import React from 'react';

export interface ButtonGroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  size?: 'large' | 'middle' | 'small';
  shape?: 'circle' | 'round';
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { className, children, ...restProps } = props;
  return (
    <div {...restProps} className={cls('ant-btn-group', className)}>
      {children}
    </div>
  );
};

export default ButtonGroup;
