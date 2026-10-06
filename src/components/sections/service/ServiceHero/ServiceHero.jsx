import { PageHero } from '@/components/sections/shared/PageHero';

/**
 * Service detail hero — the shared page hero with the service breadcrumb.
 *
 * The trail is passed in rather than built here: the page also feeds it to
 * `buildBreadcrumbSchema`, and one array shared by both guarantees the
 * `BreadcrumbList` can never disagree with the crumbs on screen.
 *
 * @param {Object} props
 * @param {import('@/data/services').Service} props.service
 * @param {ReturnType<typeof import('@/lib/services').getServicePage>} props.page
 * @param {Array<{label: string, to?: string}>} props.breadcrumb
 */
export function ServiceHero({ service, page, breadcrumb }) {
  return (
    <PageHero
      id="service-title"
      title={page.heroTitle}
      keyword={page.heroKeyword}
      subtitle={page.heroSubtitle}
      image={page.heroImage}
      eyebrow={service.category}
      breadcrumb={breadcrumb}
    />
  );
}
