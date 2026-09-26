import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/components/common/PageLoader';
import { SiteLayout } from '@/components/layout/SiteLayout';
import HomePage from '@/pages/HomePage';

import { paths } from './paths';

// The home page ships in the main bundle (it is the landing route); everything
// else is code-split so first paint stays light.
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

/** Route table for the whole site. */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.services} element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
