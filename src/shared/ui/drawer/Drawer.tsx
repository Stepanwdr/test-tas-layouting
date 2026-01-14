import {type FC, type ReactNode, useEffect} from 'react'
import closeIcon from "../../../assets/closeIcon.svg"
import './drawer.css'

interface Props {
  open: boolean;
  onClose: () => void
  children: ReactNode
  headerNode: ReactNode
}

export const Drawer:FC<Props>=({ open, onClose, headerNode,children }) => {

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
          {headerNode}
          <button className="icon-btn" aria-label="Закрыть" onClick={onClose}>
            <img src={closeIcon} alt="close"/>
          </button>
        </div>
        {children}
      </div>
      {open && <div className="backdrop" onClick={onClose} />}
    </>
  )
}