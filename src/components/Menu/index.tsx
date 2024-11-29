import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuProps } from "./subMenu";

export type MenuComponent = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>
  SubMenu: React.FC<SubMenuProps>
}

const TransMenu: MenuComponent = Menu as MenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu
