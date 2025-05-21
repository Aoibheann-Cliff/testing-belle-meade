import "@/app/globals.css";
import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
    <html lang="en">
      <head>
        <title>Belle Meade Village</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
