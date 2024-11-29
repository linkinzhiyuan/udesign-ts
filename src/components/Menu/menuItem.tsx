import React from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import './style/index.less';
import { Item } from 'rc-menu';

export interface MenuItemProps {
  index?: string;
  /** 扩展的 className */
  className?: string;
  /** 自定义样式 style */
  style?: React.CSSProperties;
  /** 选项是否被禁用 */
  disabled?: boolean;
  children?: React.ReactNode
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, disabled, index, children } = props;
  const { prefixCls, onSelect, index: contextIndex} = React.useContext(MenuContext);

  const handleClick = () => {
    if (onSelect && !disabled && typeof index === 'string') {
      onSelect(index);
    }
  }
  const classes = classNames(
    {
      'is-disabled': disabled,
      'is-active': contextIndex === index,
    },
    className
  )
  return <Item className={classNames(
      {
        // [`${prefixCls}-item-danger`]: danger,
        // [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1,
      },
      className,
    )}
    style={style} onClick={handleClick}>
    {children}
  </Item>;
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
