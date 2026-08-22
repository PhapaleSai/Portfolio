import './globals.css';

export const metadata = {
  title: 'Sai Rajesh Phapale | Associate Software Developer',
  description: 'Personal portfolio of Sai Rajesh Phapale — Associate Software Developer skilled in Python, Django, FastAPI, AWS, and AI/LLM applications. Based in Pune, India.',
  keywords: 'Sai Phapale, Python Developer, Backend Developer, Django, FastAPI, AWS, AI Agents, Portfolio, Pune',
  openGraph: {
    title: 'Sai Rajesh Phapale | Portfolio',
    description: 'Associate Software Developer — Python, AWS, and AI-powered applications, from Pune, India.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
