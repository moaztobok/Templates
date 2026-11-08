import { Component, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/seo/PageMeta";

const ARROW_SVG = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
      fill="currentColor"
    />
  </svg>
);

// Auto-discover every section component in the project.
const sectionModules = import.meta.glob<{ default?: ComponentType }>(
  "../shared/sections/**/Section*.tsx",
  { eager: true },
);

type SectionInfo = {
  folder: string;
  name: string;
  source: string;
  Component: ComponentType;
};

function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true });
}

const SECTIONS: SectionInfo[] = Object.entries(sectionModules)
  .map(([path, mod]) => {
    const Component = mod.default;
    if (!Component) return null;
    const normalized = path.replace(/\\/g, "/");
    const match = normalized.match(/shared\/sections\/([^/]+)\/([^/]+)\.tsx$/);
    const folder = match?.[1] ?? "";
    const name = match?.[2] ?? normalized;
    return {
      folder,
      name,
      source: `@/shared/sections/${folder}/${name}`,
      Component,
    };
  })
  .filter((x): x is SectionInfo => x !== null)
  .sort((a, b) => naturalCompare(a.folder, b.folder) || naturalCompare(a.name, b.name));

function categorize(folder: string): string {
  if (folder.startsWith("index-")) return "home";
  if (folder.startsWith("about-")) return "about";
  if (folder.startsWith("portfolio-details")) return "portfolio-details";
  if (folder.startsWith("portfolio-")) return "portfolio";
  if (folder.startsWith("services-")) return "services";
  if (folder.startsWith("pricing-")) return "pricing";
  if (folder.startsWith("archive-") || folder === "blog-details") return "blog";
  if (folder === "product" || folder.startsWith("product-")) return "shop";
  if (folder.startsWith("team-")) return "team";
  if (folder.startsWith("contact-")) return "contact";
  return "other";
}

const CATEGORY_KEYS = [
  "home",
  "about",
  "portfolio",
  "portfolio-details",
  "services",
  "pricing",
  "blog",
  "shop",
  "team",
  "contact",
  "other",
];

const CATEGORY_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  portfolio: "Portfolio",
  "portfolio-details": "Portfolio Details",
  services: "Services",
  pricing: "Pricing",
  blog: "Blog",
  shop: "Shop",
  team: "Team",
  contact: "Contact",
  other: "Other",
};

class SectionBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[Sections] failed to render section:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="py-4 text-danger fz-font-md">
            Could not render this section — it may require props or page context.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SectionsPage() {
  const [active, setActive] = useState("home");

  const visible = SECTIONS.filter((s) => categorize(s.folder) === active);

  const grouped = new Map<string, SectionInfo[]>();
  for (const section of visible) {
    const list = grouped.get(section.folder) ?? [];
    list.push(section);
    grouped.set(section.folder, list);
  }
  const folders = [...grouped.keys()].sort(naturalCompare);

  return (
    <>
      <PageMeta title="Dreammbymoaz — Sections" />
      <div className="pt-150 pb-60">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
            <div>
              <h1 className="fz-ds-1 fw-500">Sections</h1>
              <p className="fz-font-lg neutral-500 mb-0">
                Every section available in the project, grouped by type.
              </p>
            </div>
            <Link to="/" className="at-btn">
              <span>
                <span className="text-1">Back to Home</span>
                <span className="text-2">Back to Home</span>
              </span>
              <i>
                {ARROW_SVG}
                {ARROW_SVG}
              </i>
            </Link>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2 mt-30">
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`at-btn filter-btn btn-sm ${active === key ? "active" : ""}`}
                onClick={() => setActive(key)}
              >
                {CATEGORY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {folders.map((folder) => (
        <div key={folder}>
          <div className="container">
            <div className="border-bottom-950 py-4">
              <h2 className="h4 fw-600 mb-0 text-uppercase">{folder}</h2>
            </div>
          </div>
          {grouped.get(folder)!.map((section) => {
            const Component = section.Component;
            return (
              <div key={`${folder}/${section.name}`}>
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 border-bottom-100 py-3">
                    <span className="fw-600 text-uppercase fz-font-md">{section.name}</span>
                    <code className="fz-font-label neutral-500">{section.source}</code>
                  </div>
                </div>
                <SectionBoundary>
                  <Component />
                </SectionBoundary>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
