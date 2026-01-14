import { type ReactNode } from 'react'
import PostCard from './PostCard'
import './posts.css'
import type { Post } from "../../shared/types/Post.ts";

export function Posts({ posts, onSelect, topNode }: { posts: Post[]; onSelect: (p: Post) => void; topNode?: ReactNode }) {
  return (
    <section className="posts-section container">
      {topNode}
      <div className="posts-grid">
        {posts.map((p, i) => (
          <PostCard key={(p.id ?? i).toString()} post={p} onClick={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default Posts
