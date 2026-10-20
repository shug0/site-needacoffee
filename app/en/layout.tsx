import type { Metadata } from 'next';

// The page itself is a client component and cannot export metadata.
export const metadata: Metadata = {
  alternates: {
    canonical: '/en',
    languages: {
      'fr-FR': '/',
      'en-US': '/en',
    },
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
