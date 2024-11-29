import React from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children?: React.ReactNode
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = React.useContext(MenuContext);
  const { index, title, className, children } = props;
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [ menuOpen, setOpen ] = React.useState(isOpen);

  const clickEvents =  context.mode === 'vertical' ? {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(!menuOpen);
    }
  } : {}
  const hoverEvents = context.mode === 'vertical' ? {} : {
    onMouseEnter: (e: React.MouseEvent) => {
      setOpen(true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setOpen(false);
    }
  }

  const classes = classNames(
    {
      'is-active': context.index === index,
      'is-opened': menuOpen,
    },
    className
  )

  const renderChildren = () => {
    const subMenuClasses = classNames('sub-menu', {
      'menu-vertical': context.mode === 'vertical',
      'menu-horizontal': context.mode === 'horizontal',
      'menu-open': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}`
        })
      } else {
        console.log('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title"  {...clickEvents}>
        {title}
        {/* <Icon icon="angle-down" className="arrow-icon"/> */}
      </div>
      {renderChildren()}
    </li>
  )
};

SubMenu.displayName = 'SubMenu'

export default SubMenu;
