import { type FC, useEffect, useMemo, useState} from 'react'
import { PostCard } from './PostCard'
import './posts.css'
import type { Post } from "../../shared/types/Post";
import {Modal} from "../../shared/ui";

function normalizeText(p: Post) {
  return [p.text, p.subtitle, p.description].filter(Boolean).join(' ')
}

interface Props {
  query:string
}

export const Posts:FC<Props> = ({query})=> {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Post | null>(null)

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
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Ошибка загрузки')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="posts-section container">
      <div className="posts-grid">
        {filtered.map((p, i) => (
          <PostCard key={(p.id ?? i).toString()} post={p} onClick={setSelected} />
        ))}
      </div>
      {loading && <div className="container" style={{ padding: '1rem' }}>Загрузка…</div>}
      {error && <div className="container" style={{ padding: '1rem', color: 'crimson' }}>{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="container" style={{ padding: '1rem' }}>Ничего не найдено</div>
      )}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        <p>{selected && normalizeText(selected )}</p>
      </Modal>
    </section>
  )
}

export default Posts
