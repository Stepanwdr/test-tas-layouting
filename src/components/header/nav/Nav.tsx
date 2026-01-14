import { NavItem } from "./NavItem.tsx";
import type { MenuItem } from "../../../shared/types/Ui";

type Props = {
  passedThreshold?: boolean;
  direction?: 'up' | 'down';
  menuItems:  Record<string, MenuItem[]>
  isMobile?: boolean;
};

export const Nav = ({
  passedThreshold,
  direction,
  menuItems,
  isMobile
}: Props) => {
  return (
    <nav
      className={`
        main-nav show-desktop
        ${!isMobile && passedThreshold ? 'is-sticky' : ''}
        ${!isMobile &&  passedThreshold && direction === 'down' ? 'nav-hidden' : ''}
      `}
    >
      <div className="container">
        <ul className={`menu ${isMobile && 'mobile-menu'}`}>
          <NavItem label="Demos" items={menuItems.Demos} />
          <NavItem label="Post" items={menuItems.Post} />
          <NavItem label="Features" items={menuItems.Features} />
          <NavItem
            label="Categories"
            items={menuItems.Categories}
          />
          <NavItem
            label="Shop"
            items={menuItems.Shop}
          />
          <NavItem
            label="Buy Now"
            items={[]}
            withArrow={false}
          />
        </ul>
      </div>
    </nav>
  );
};
