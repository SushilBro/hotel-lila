import "./globals.css";

export const metadata = {
  title: "HotelLilaIn Admin"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-background text-brand-text">{children}</body>
    </html>
  );
}
