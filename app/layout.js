import './globals.css';

export const metadata = {
  title: 'Sai Rajesh Phapale | Full Stack & DevOps Engineer',
  description: 'Personal portfolio of Sai Rajesh Phapale — Web Developer & DevOps Engineer skilled in Django, AWS, Docker, Kubernetes, and more. Based in Pune, India.',
  keywords: 'Sai Phapale, DevOps, Web Developer, Django, AWS, Docker, Kubernetes, Portfolio, Pune',
  openGraph: {
    title: 'Sai Rajesh Phapale | Portfolio',
    description: 'Full Stack Developer & DevOps Engineer from Pune, India.',
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
