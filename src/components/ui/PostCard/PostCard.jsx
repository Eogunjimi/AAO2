import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';

import styles from './PostCard.module.css';

/**
 * Editorial card for a single post, linking to the full article.
 *
 * The whole card is clickable: the title is a real link stretched over the
 * card with a pseudo-element, which keeps the card's text selectable.
 *
 * "Read now" is a second, genuine control rather than decoration, so it is
 * reachable by keyboard and announced by screen readers. Two things follow
 * from that:
 *
 * - it is lifted above the stretched pseudo-element (see `.cta`) so it
 *   receives its own clicks instead of the overlay swallowing them;
 * - its accessible name carries the post title, because a list of cards each
 *   offering an identical "Read now" tells a screen-reader user nothing about
 *   where any of them go.
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

        <Button
          to={paths.blogPost(post.slug)}
          variant="ghost"
          size="sm"
          className={styles.cta}
          aria-label={`Read now: ${post.title}`}
        >
          Read now
        </Button>
      </div>
    </article>
  );
}
