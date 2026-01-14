import type { FC } from "react";
import type { Post } from "../../shared/types/Post";

import './posts.css';

interface Props {
  post: Post;
  onClick: (p: Post) => void
}

export const PostCard:FC<Props> =({ post, onClick }) => {
  const title = post.title
  const desc = post.text || post.subtitle || post.description || ''
  const img = post.img
  const img2x = post.img2x
  return (
    <article className="post-card" onClick={() => onClick(post)} tabIndex={0} role="button">
      {img && (
        <div className="thumb">
          <img
            src={img}
            srcSet={img2x ? `${img} 1x, ${img2x} 2x` : undefined}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={title}
            loading="lazy"
          />
        </div>
      )}
      <div className="meta">
        {post.tags && <span className="tags">{post.tags}</span>}
      </div>
      <h3 className="title">{title}</h3>
      <div className="meta">
        {post.autor && <span className="author">{post.autor}</span>}
        {post.date && <span className="muted"> · {post.date}</span>}
        {post.views && <span className="muted"> · {post.views}</span>}
      </div>
      {desc && <p className="excerpt">{desc}</p>}
      <div className="post-footer">
        {typeof post.comments === 'number' && <span className="muted"> · Комм: {post.comments}</span>}
      </div>
    </article>
  )
}
