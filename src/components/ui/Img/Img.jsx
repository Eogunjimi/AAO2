import { imageSizes } from '@/lib/imageSizes';

/**
 * <img> that always carries intrinsic width and height for local images, so the
 * browser reserves the right space before the file arrives (no layout shift).
 *
 * Sizes come from src/lib/imageSizes.js (generated from public/images). Explicit
 * width/height props win. Remote images get no attributes unless passed in.
 *
 * @param {import('react').ImgHTMLAttributes<HTMLImageElement>} props
 */
export function Img({ src, width, height, alt, ...rest }) {
  const known = typeof src === 'string' ? imageSizes[src] : undefined;

  if (import.meta.env.DEV && typeof src === 'string' && src.startsWith('/images/') && !known) {
    console.warn(`[Img] No size recorded for ${src}. Run "npm run images:sizes".`);
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width ?? known?.width}
      height={height ?? known?.height}
      {...rest}
    />
  );
}
