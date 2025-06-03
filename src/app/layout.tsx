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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
        <title>Belle Meade Village</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
