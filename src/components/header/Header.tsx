import { useEffect, useRef, useState } from 'react'
import { useScrollDirection } from '../../hooks/useScrollDirection.ts'
import logo from "../../assets/logo.png"
import searchIcon from "../../assets/search.png"
import './header.css'
type SubItem = { label: string; href: string }
const subMenus: Record<string, SubItem[]> = {
  Demos: [
    { label: 'Demos 1', href: '#' },
    { label: 'Demos 2', href: '#' },
  ],
  Post: [
    { label: 'Post Header', href: '#' },
    { label: 'Post Layout', href: '#' },
    { label: 'Share Buttons', href: '#' },
    { label: 'Gallery Post', href: '#' },
    { label: 'Video Post', href: '#' },
  ],
  Features: [
    { label: 'Typography', href: '#' },
    { label: 'Buttons', href: '#' },
  ],
  Categories: [
    { label: 'Travel', href: '#' },
    { label: 'Lifestyle', href: '#' },
  ],
  Shop: [
    { label: 'Products', href: '#' },
    { label: 'Cart', href: '#' },
  ],
}
export function Header({ onOpenMobile, setQuery }: { onOpenMobile: () => void,setQuery: (query: string) => void }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (isSearchOpen) { searchInputRef.current?.focus() } }, [isSearchOpen])

  const { direction, passedThreshold } = useScrollDirection(200)

  return (
    <header className="site-header">
      <div className="topbar container">
        <button className="hamburger hide-desktop" aria-label="Open menu" onClick={onOpenMobile}>
          <span />
          <span />
          <span />
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
              <img src={searchIcon} alt=""/>
            </button>
          </form>
        </div>
      </div>

      <nav
        className={`main-nav show-desktop ${passedThreshold && direction === 'down' ? 'nav-hidden' : ''}`}
      >
        <div className="container">
          <ul className="menu">
            <li className="menu-item">
              <a href="#">Demos</a>
              <ul className="submenu">
                {subMenus.Demos.map((item) => (
                  <li key={item.label}><a href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </li>
            <li className="menu-item">
              <a href="#">Post</a>
              <ul className="submenu">
                {subMenus.Post.map((item) => (
                  <li key={item.label}><a href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </li>
            <li className="menu-item">
              <a href="#">Features</a>
              <ul className="submenu">
                {subMenus.Features.map((item) => (
                  <li key={item.label}><a href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </li>
            <li className="menu-item">
              <a href="#">Categories</a>
              <ul className="submenu">
                <li><a href="#">Travel</a></li>
                <li><a href="#">Lifestyle</a></li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="#">Shop</a>
              <ul className="submenu">
                <li><a href="#">Products</a></li>
                <li><a href="#">Cart</a></li>
              </ul>
            </li>
            <li className="menu-item"><a href="#">Buy Now</a></li>
          </ul>
        </div>
      </nav>

    </header>
  )
}

export default Header
