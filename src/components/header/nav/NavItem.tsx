import type {MenuItem} from "../../../shared/types/Ui.ts";
import arrowRight from "../../../assets/arrow-right.svg"
import arrowBottom from "../../../assets/arrow-bottom.svg"

type Props = {
  label: string;
  items?: MenuItem[];
  withArrow?: boolean;
};

export const NavItem = ({ label, items, withArrow = true }: Props) => {
  const hasSubmenu = items && items.length > 0;
  return (
    <li className="menu-item">
      <div>
        <a href="#">{label}</a>
        {withArrow && <img src={arrowBottom} alt="arrowBottom"/>}
      </div>
      {hasSubmenu && (
        <ul className="submenu">
          {items!.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
              <img src={arrowRight} alt="arrowRight" />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
