import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/components/common/PageLoader';
import { SiteLayout } from '@/components/layout/SiteLayout';
import HomePage from '@/pages/HomePage';

import { paths } from './paths';

// The home page ships in the main bundle (it is the landing route); everything
// else is code-split so first paint stays light.
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const ServiceAreaPage = lazy(() => import('@/pages/ServiceAreaPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'));

/** Route table for the whole site. */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.services} element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path={paths.projects} element={<ProjectsPage />} />
          <Route path={paths.blog} element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/service-areas/:slug" element={<ServiceAreaPage />} />

          {/* Announced in the About menu; placeholders until the real pages land. */}
          <Route path={paths.team} element={<ComingSoonPage pageKey="team" />} />
          <Route path={paths.career} element={<ComingSoonPage pageKey="career" />} />
          <Route path={paths.academy} element={<ComingSoonPage pageKey="academy" />} />
          <Route path={paths.shop} element={<ComingSoonPage pageKey="shop" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
