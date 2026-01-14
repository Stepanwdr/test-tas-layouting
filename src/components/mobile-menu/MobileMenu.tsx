import { useEffect } from 'react'
import logo from "../../assets/logo.png"
import './mobile-menu.css'
import { menuItems } from "../../shared/mocks/menuItems";
import { NavItem } from "../header/nav/NavItem";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-header">
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <button className="icon-btn" aria-label="Закрыть" onClick={onClose}>×</button>
        </div>
        <ul className='drawer-nav'>
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
            withArrow={false}
            label="Buy Now"
            items={[]}
          />
        </ul>
      </div>
      {open && <div className="backdrop" onClick={onClose} />}
    </>
  )
}

export default MobileMenu