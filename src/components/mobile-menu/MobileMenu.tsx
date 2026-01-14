import {type FC} from 'react'
import { Drawer } from "../../shared/ui";

import './mobile-menu.css'
import { menuItems } from "../../shared/mocks/menuItems";
import {Nav} from "../header/nav/Nav";
import logo from "../../assets/logo.png";

interface Props {
  open: boolean;
  onClose: () => void
}

export const MobileMenu:FC<Props>=({ open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      headerNode={
        <div className="logo">
        <img src={logo} alt="logo"/>
        </div>
    }>
      <Nav isMobile menuItems={menuItems} />
    </Drawer>
  )
}