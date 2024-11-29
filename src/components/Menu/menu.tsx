import React, { useState } from "react";
import classNames from "classnames";

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
}

export interface MenuContextProps {
  index: string;
  onSelect?: selectCallback;
  mode?: MenuMode;
}

export const MenuContext = React.createContext<MenuContextProps>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex = "0", mode = "horizontal", onSelect, className, children, style } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex); // 当前激活菜单

  const classes = classNames(
    {
      'is-vertical': mode === 'vertical',
      'is-horizontal': mode === 'horizontal',
    },
    className
  )

  const handleSelect = (index: string) => {
    setActiveIndex(index);
    onSelect && onSelect(index);
  }

  // 传递给子菜单
  const passedContext: MenuContextProps = {
    index: activeIndex ?? '0',
    onSelect: handleSelect,
    mode
  }

  return <ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
      {children}
    </MenuContext.Provider>
  </ul>;
};

export default Menu;
