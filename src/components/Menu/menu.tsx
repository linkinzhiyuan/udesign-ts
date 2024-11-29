import React, { useState } from "react";
import classNames from "classnames";
import './style/index.less';
import RcMenu from 'rc-menu'
import { MenuItemProps } from './menuItem'

type MenuMode = "horizontal" | "vertical";
type selectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /** 默认菜单索引值 */
  defaultIndex?: string;
  /** 菜单模式：横向或者纵向 */
  mode?: MenuMode;
  /** 点击菜单的回调 */
  onSelect?: selectCallback;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark'
}

export interface MenuContextProps {
  index: string;
  onSelect?: selectCallback;
  mode?: MenuMode;
  prefixCls?: string,
  defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<MenuContextProps>({ index: "0" });


const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

export const getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string = defaultGetPrefixCls


const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex = "0", mode = "horizontal", onSelect, className, children, style, theme = 'light', } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex); // 当前激活菜单

  const prefixCls = getPrefixCls('menu', '');
  const menuClassName = classNames(`${prefixCls}-${theme}`, className);

  const handleSelect = (index: string) => {
    setActiveIndex(index);
    onSelect && onSelect(index);
  }

  // 传递给子菜单
  const passedContext: MenuContextProps = {
    index: activeIndex ?? '0',
    onSelect: handleSelect,
    mode,
    prefixCls
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }


  return <ul className={menuClassName} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
      {/* {children} */}
      <RcMenu
          // getPopupContainer={getPopupContainer}
          // overflowedIndicator={<EllipsisOutlined />}
          overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
          mode={mode}
          // selectable={mergedSelectable}
          // onClick={onItemClick}
          // {...passedProps}
          // inlineCollapsed={mergedInlineCollapsed}
          className={menuClassName}
          prefixCls={prefixCls}
          // direction={direction}
          // defaultMotions={defaultMotions}
          // expandIcon={mergedExpandIcon}
          // ref={ref}
        >
          {renderChildren()}
        </RcMenu>
    </MenuContext.Provider>
  </ul>;
};

export default Menu;
