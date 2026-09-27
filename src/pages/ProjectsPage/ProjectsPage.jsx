import { Seo } from '@/components/common/Seo';
import { ContactSection, TrustBadges } from '@/components/sections/home';
import { FaqBand } from '@/components/sections/shared/FaqBand';
import { PageHero } from '@/components/sections/shared/PageHero';
import { PastWorks } from '@/components/sections/shared/PastWorks';
import { projectFaqs } from '@/data/faqs';
import { paths } from '@/routes/paths';

/** Gallery of completed installations across Lagos. */
export default function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects — completed solar, security and electrical installations in Lagos"
        description="See completed AAO Engineering Services installations across Lagos: solar and inverter systems, CCTV and access control, electrical rewires, automatic gates and commercial hybrid power."
      />

      <PageHero
        id="projects-title"
        eyebrow="Our Work"
        title="Solar, Security and Electrical Projects in Lagos That Speak for Themselves"
        keyword="Solar, Security and Electrical Projects"
        subtitle="200+ installations, one property at a time — and every one still running."
        image="/images/project-commercial.jpg"
        breadcrumb={[{ label: 'Home', to: paths.home }, { label: 'Projects' }]}
      />

      <TrustBadges />

      <PastWorks
        title={
          <>
            Work We Have <em>Already Delivered</em>
          </>
        }
        description="Filter by the kind of job you are planning — every one of these started with a free site inspection and a measured assessment."
      />

      <ContactSection />

      <FaqBand
        id="projects-faq-title"
        title="Projects: Your Questions Answered"
        faqs={projectFaqs}
      />
    </>
  );
}
