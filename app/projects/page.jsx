import ProjectsPageContent from '@/views/ProjectsPage/ProjectsPage';
import { buildMetadata } from '@/lib/metadata';
import { projectFaqs } from '@/data/faqs';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

export const metadata = buildMetadata({
  title: 'Projects — completed solar, security and electrical installations in Lagos',
  description:
    'See completed AAO Engineering Services installations across Lagos: solar and inverter systems, CCTV and access control, electrical rewires, automatic gates and commercial hybrid power.',
  pathname: paths.projects,
});

const breadcrumb = [{ label: 'Home', to: paths.home }, { label: 'Projects' }];

export default function ProjectsRoute() {
  const jsonLd = [buildFaqSchema(projectFaqs), buildBreadcrumbSchema(breadcrumb)];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPageContent />
    </>
  );
}
