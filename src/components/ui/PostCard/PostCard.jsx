import { Link } from '@/lib/router';

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
 * "Read now" is a genuine control built from the `<Button />` primitive, not
 * bespoke markup — it inherits the design system's pill shape, sizing scale,
 * hover lift, pressed state and focus ring, and will follow any future change
 * to them. Three consequences worth knowing:
 *
 * - it is lifted above the stretched pseudo-element (see `.cta`) so it takes
 *   its own clicks rather than the overlay swallowing them;
 * - its accessible name carries the post title, because a grid of cards each
 *   offering an identical "Read now" tells a screen-reader user nothing about
 *   where any of them go;
 * - `ghost` is the default because the card always paints its own light
 *   surface, even inside the dark sections that host it. A host that changes
 *   that can pass `ctaVariant` (e.g. `ghost-light`) rather than fork the card.
 *
 * The insights rail on the home page and the blog index render this exact
 * component, so the two cannot drift apart. Sizing belongs to the parent.
 *
 * @param {Object} props
 * @param {import('@/data/posts').Post} props.post
 * @param {'solid'|'volt'|'whatsapp'|'ghost'|'ghost-light'} [props.ctaVariant]
 * @param {string} [props.className]
 */
export function PostCard({ post, ctaVariant = 'ghost', className }) {
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
          variant={ctaVariant}
          size="sm"
          // The card-hover echo is tuned to `ghost` on the card's light
          // surface. Every other variant keeps its own hover untouched.
          className={cn(styles.cta, ctaVariant === 'ghost' && styles.ctaGhost)}
          aria-label={`Read now: ${post.title}`}
        >
          Read now
        </Button>
      </div>
    </article>
  );
}
