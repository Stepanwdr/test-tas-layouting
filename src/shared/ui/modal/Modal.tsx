import { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './modal.css'

export function Modal({ open, onClose, children, title }: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="icon-btn" aria-label="Закрыть" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
