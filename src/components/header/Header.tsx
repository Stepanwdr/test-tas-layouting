import { type FC, useEffect, useRef, useState } from 'react'
import logo from "../../assets/logo.png"
import searchIcon from "../../assets/search.png"
import BurgerIcon from "../../assets/burger.svg"
import './header.css'

interface Props {
  onOpenMobile: () => void,
  setQuery: (query: string) => void
}

export const Header: FC<Props>=({ onOpenMobile, setQuery }) =>{
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
      }
    }, [isSearchOpen])

  return (
    <header className="site-header">
      <div className="topbar container">
        <button className="hamburger hide-desktop" aria-label="Open menu" onClick={onOpenMobile}>
          <img src={BurgerIcon} alt="Burger"/>
        </button>

        {/* Centered logo */}
        <div className="logo" aria-label="Logo">
          <img src={logo} alt="Logo"/>
        </div>

        {/* Right actions */}
        <div className="topbar-actions">
          <form
            className={`search ${isSearchOpen ? 'is-open' : ''}`}
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchInputRef}
              type="search"
              className="search-input"
              name={'search'}
              placeholder="Поиск по заголовку или описанию..."
              aria-label="Search"
              onKeyDown={(e) => {
                if (e.key === 'Escape') { setIsSearchOpen(false) }
              }}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="icon-button search-toggle"
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              onClick={() => setIsSearchOpen((v) => !v)}
            >
              <img src={searchIcon} alt="search-icon"/>
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
