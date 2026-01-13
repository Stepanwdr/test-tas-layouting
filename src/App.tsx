import { useEffect, useMemo, useState } from 'react'
import Header from './components/header/Header.tsx'
import MobileMenu from './components/mobile-menu/MobileMenu.tsx'
import PostsGrid from './components/Posts/PostsGrid.tsx'
import Modal from './components/modal/Modal.tsx'
import './index.css'
import type { Post } from "./types/Post";

function normalizeText(p: Post) {
  return [p.text, p.subtitle, p.description].filter(Boolean).join(' ')
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Post | null>(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(p => {
      const title = p.title?.toLowerCase() || ''
      const text = normalizeText(p).toLowerCase()
      return title.includes(q) || text.includes(q)
    })
  }, [posts, query])


  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('https://cloud.codesupply.co/endpoint/react/data.json')
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        if (!cancelled) {
          setPosts(data)
          setError(null)
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Ошибка загрузки')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      <Header onOpenMobile={() => setMobileOpen(true)} setQuery={setQuery} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main>
        {loading && <div className="container" style={{ padding: '1rem' }}>Загрузка…</div>}
        {error && <div className="container" style={{ padding: '1rem', color: 'crimson' }}>{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="container" style={{ padding: '1rem' }}>Ничего не найдено</div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <PostsGrid posts={filtered} onSelect={setSelected} />
        )}
      </main>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        <p>{normalizeText(selected || { title: '' })}</p>
      </Modal>
    </div>
  )
}

export default App
