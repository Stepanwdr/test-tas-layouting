import { useEffect } from 'react'
import logo from "../../assets/logo.png"
import './mobile-menu.css'

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
        <nav className="drawer-nav">
          <a href="#" onClick={onClose}>Главная</a>
          <a href="#" onClick={onClose}>Новости</a>
          <a href="#" onClick={onClose}>Авторы</a>
          <a href="#" onClick={onClose}>Контакты</a>
        </nav>
      </div>
      {open && <div className="backdrop" onClick={onClose} />}
    </>
  )
}

export default MobileMenu
