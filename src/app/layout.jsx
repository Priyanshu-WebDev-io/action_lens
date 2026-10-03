import './globals.css';

export const metadata = {
  title: 'ActionLens — Turn Documents Into Action Plans',
  description: 'Multimodal AI tool that transforms complex documents, notices, circulars, and instructions into clear, sequenced, deadline-aware action roadmaps.',
  keywords: ['ActionLens', 'Document AI', 'Gemma', 'Action Plan', 'Circulars', 'Notices', 'Productivity'],
  authors: [{ name: 'ActionLens Team' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200">
        {children}
      </body>
    </html>
  );
}
