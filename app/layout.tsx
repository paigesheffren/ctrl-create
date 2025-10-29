import './globals.css';
import ChatWidget from './components/ChatWidget';

export const metadata = {
  title: 'CTRL & Create — AI-assisted Web Design (Montréal)',
  description: 'CTRL & Create builds fast, beautiful, AI-assisted websites at prices below typical designers. Montréal-based.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-slate-900">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
