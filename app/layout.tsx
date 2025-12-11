export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>Navigation Menu</header>
        {children}
        <footer>Welcome to the footer</footer>
      </body>
    </html>
  );
}
