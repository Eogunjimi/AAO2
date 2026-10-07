import BlogPageContent from '@/views/BlogPage/BlogPage';
import { buildMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

export const metadata = buildMetadata({
  title: 'Blog — solar, security and electrical guides for Lagos homes',
  description:
    'Practical guides from AAO Engineering Services: sizing an inverter and battery bank, planning CCTV coverage, solar versus generator costs, load audits, automatic gates and structured cabling.',
  image: '/images/warm-detail.jpg',
  pathname: paths.blog,
});

const breadcrumb = [{ label: 'Home', to: paths.home }, { label: 'Blog' }];

export default function BlogRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([buildBreadcrumbSchema(breadcrumb)]) }}
      />
      <BlogPageContent />
    </>
  );
}
