import React from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

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
  const context = React.useContext(MenuContext);

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  }
  const classes = classNames(
    {
      'is-disabled': disabled,
      'is-active': context.index === index,
    },
    className
  )
  return <li className={classes} style={style} onClick={handleClick}>
    {children}
  </li>;
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
