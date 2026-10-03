import './globals.css';

export const metadata = {
  title: 'ActionLens — Turn Documents Into Action Plans',
  description: 'Multimodal AI tool that transforms complex documents, notices, circulars, and instructions into clear, sequenced, deadline-aware action roadmaps.',
  keywords: ['ActionLens', 'Document AI', 'Gemma', 'Action Plan', 'Circulars', 'Notices', 'Productivity'],
  authors: [{ name: 'ActionLens Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-white text-slate-900 antialiased selection:bg-sky-500/20 selection:text-sky-950"
      >
        {children}
      </body>
    </html>
  );
}
