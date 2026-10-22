import { BrowserRouter } from 'react-router-dom';

import { AnalyticsTracker } from '@/components/common/AnalyticsTracker';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppRoutes } from '@/routes';

/** Application root: error boundary → router → analytics + routes. */
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnalyticsTracker />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
