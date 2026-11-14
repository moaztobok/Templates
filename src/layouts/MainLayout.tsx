"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PopupSearch from "@/shared/PopupSearch";
import HeaderPortfolio from "@/shared/header/HeaderPortfolio";
import Footer2 from "@/shared/footer/Footer2";
import SideBar from "@/shared/sidebar/SideBar";
import { MobileMenuCloneProvider } from "@/shared/mobile-menu/MobileMenuCloneContext";
import GlobalEffects from "@/shared/effects/GlobalEffects";
import ThemeRouteSync from "@/shared/effects/ThemeRouteSync";
import BackToTop from "@/shared/elements/BackToTop";
import SmoothScrollEffect from "@/shared/effects/SmoothScrollEffect";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  const handlers = useMemo(
    () => ({
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      toggleSidebar: () => setSidebarOpen((v) => !v),
      openSidebar: () => setSidebarOpen(true),
      closeSidebar: () => setSidebarOpen(false),
      openHamburgerMenu: () => setHamburgerMenuOpen(true),
      closeHamburgerMenu: () => setHamburgerMenuOpen(false),
      closeAllMenus: () => {
        setSidebarOpen(false);
        setHamburgerMenuOpen(false);
      },
    }),
    [],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSidebarOpen(false);
        setHamburgerMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Bridge DOM class triggers (search / sidebar / hamburger) to React state.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      if (t.closest(".at-search-click, .search-btn")) {
        e.preventDefault();
        setSearchOpen(true);
        return;
      }
      if (t.closest(".at-header-sidebar-btn, .navbar-toggler, .at-menu-bar")) {
        e.preventDefault();
        setSidebarOpen(true);
        return;
      }
      if (t.closest(".at-header-menu-btn")) {
        e.preventDefault();
        const btn = (t.closest(".at-header-menu-btn") as HTMLElement) ?? null;
        const header = btn?.closest("header");
        if (header) {
          const isOpen = header.classList.contains("is-menu-open");
          header.classList.toggle("is-menu-open", !isOpen);
          btn?.setAttribute("aria-expanded", String(!isOpen));
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Sticky header on scroll.
  useEffect(() => {
    const el = document.getElementById("header-sticky");
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY ?? window.pageYOffset;
      el.classList.toggle("header-sticky", y >= 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MobileMenuCloneProvider>
      <div className="px-blur-bottom" />
      <SmoothScrollEffect />
      <GlobalEffects />
      <ThemeRouteSync />
      <HeaderPortfolio
        onOpenSearch={handlers.openSearch}
        onToggleSidebar={handlers.toggleSidebar}
        onOpenHamburgerMenu={handlers.openHamburgerMenu}
      />
      <SideBar open={sidebarOpen} hamburgerOpen={hamburgerMenuOpen} onClose={handlers.closeAllMenus} />
      <PopupSearch open={searchOpen} onClose={handlers.closeSearch} />

      <div id="smooth-wrapper">
        <div id="smooth-content" className="z-index-3">
          <main className="bg-neutral-0">{children}</main>
          <div className="footer-placeholder" aria-hidden="true" />
        </div>
        <Footer2 ref={footerRef} />
      </div>

      <BackToTop />
    </MobileMenuCloneProvider>
  );
}
