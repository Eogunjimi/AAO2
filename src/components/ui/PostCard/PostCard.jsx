import { company } from '@/data/company';
import { cn } from '@/lib/cn';

import styles from './PostCard.module.css';

/**
 * Editorial card for a single post.
 *
 * The insights rail on the home page and the blog index render this exact
 * component, so the two presentations cannot drift apart. Sizing belongs to
 * the parent — the rail gives it a flex basis, the blog index a grid cell.
 *
 * @param {Object} props
 * @param {import('@/data/posts').Post} props.post
 * @param {string} [props.className]
 */
export function PostCard({ post, className }) {
  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.thumb}>
        <img src={post.image} alt={post.alt} loading="lazy" decoding="async" />
      </div>

      <div className={styles.body}>
        <p className={styles.byline}>
          By: {company.shortName} Engineering · {post.category}
        </p>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.link}>Read now…</span>
      </div>
    </article>
  );
}
