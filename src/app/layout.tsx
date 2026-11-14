import type { Metadata } from "next";
import Script from "next/script";
import MainLayout from "@/layouts/MainLayout";

export const metadata: Metadata = {
  title: {
    default: "Dreammbymoaz",
    template: "%s — Dreammbymoaz",
  },
  description: "Dreammbymoaz — creative portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/imgs/template/logo/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/vendors/carouselTicker.css" />
        <link rel="stylesheet" href="/assets/css/vendors/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/vendors/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/vendors/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/vendors/font-awesome-pro.css" />
        <link rel="stylesheet" href="/assets/css/vendors/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/vendors/odometer.css" />
        <link rel="stylesheet" href="/assets/css/vendors/spacing.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/sticky-cards.css" />
      </head>
      <body className="at-magic-cursor">
        <Script src="/scripts/theme-init.js" strategy="beforeInteractive" />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
