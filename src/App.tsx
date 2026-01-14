import { useState } from 'react'
import { useScrollDirection } from "./shared/models/useScrollDirection";
import { menuItems } from "./shared/mocks/menuItems";
import {Header, MobileMenu, Nav, Posts} from "./components";
import './index.css'


const App= ()=> {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { direction, passedThreshold } = useScrollDirection(200)
  const [query, setQuery] = useState('')
  return (
    <div>
      <Header onOpenMobile={() => setMobileOpen(true)} setQuery={setQuery} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Nav menuItems={menuItems} direction={direction} passedThreshold={passedThreshold} />
      <main>
        <Posts query={query} />
      </main>
    </div>
  )
}

export default App
