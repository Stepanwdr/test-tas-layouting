import { type ReactNode } from 'react'
import PostCard from './PostCard.tsx'
import './posts.css'
import type { Post } from "../../types/Post.ts";

export function PostsGrid({ posts, onSelect, topNode }: { posts: Post[]; onSelect: (p: Post) => void; topNode?: ReactNode }) {
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

export default PostsGrid
