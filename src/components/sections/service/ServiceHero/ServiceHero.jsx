import { PageHero } from '@/components/sections/shared/PageHero';
import { paths } from '@/routes/paths';

/**
 * Service detail hero — the shared page hero with the service breadcrumb.
 *
 * @param {Object} props
 * @param {import('@/data/services').Service} props.service
 * @param {ReturnType<typeof import('@/lib/services').getServicePage>} props.page
 */
export function ServiceHero({ service, page }) {
  return (
    <PageHero
      id="service-title"
      title={page.heroTitle}
      keyword={page.heroKeyword}
      subtitle={page.heroSubtitle}
      image={page.heroImage}
      eyebrow={service.category}
      breadcrumb={[
        { label: 'Home', to: paths.home },
        { label: 'Services', to: paths.services },
        { label: service.title },
      ]}
    />
  );
}
