import { type ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import closeIcon from "../../../assets/closeIcon.svg"
import './modal.css'

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}) {
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) setMounted(open)
  }, [open])

  const handleAnimationEnd = () => {
    if (!open) setMounted(false)
  }

  if (!mounted) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div
      className={`modal-overlay ${open ? 'is-open' : ''}`}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-header">
          {title && <h3>{title}</h3>}
          <button onClick={onClose}><img src={closeIcon} alt="close"/> </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  )
}
