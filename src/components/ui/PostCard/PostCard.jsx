import { Link } from 'react-router-dom';

import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';

import styles from './PostCard.module.css';

/**
 * Editorial card for a single post, linking to the full article.
 *
 * The whole card is clickable, but only the title is a real link: it is
 * stretched over the card with a pseudo-element. That keeps one entry in the
 * accessibility tree — named with the post title rather than "Read now" — and
 * leaves the card's text selectable.
 *
 * The insights rail on the home page and the blog index render this exact
 * component, so the two cannot drift apart. Sizing belongs to the parent.
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

        <h3 className={styles.cardTitle}>
          <Link className={styles.titleLink} to={paths.blogPost(post.slug)}>
            {post.title}
          </Link>
        </h3>

        <p className={styles.excerpt}>{post.excerpt}</p>

        {/* Decorative: the stretched title link already covers this area. */}
        <span className={styles.link} aria-hidden="true">
          Read now…
        </span>
      </div>
    </article>
  );
}
