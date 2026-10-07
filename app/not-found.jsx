import NotFoundContent from '@/views/NotFoundPage/NotFoundPage';

export const metadata = {
  title: 'Page not found',
  description: 'The page you were looking for has moved.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
