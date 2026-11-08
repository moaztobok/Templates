import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PortfolioLayout from "@/layouts/PortfolioLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Lazy-load the sections browser so its auto-discovered section modules
// are code-split out of the main bundle.
const SectionsPage = lazy(() => import("@/pages/SectionsPage"));

export default function App() {
  return (
    <Routes>
      <Route element={<PortfolioLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/sections"
          element={
            <Suspense fallback={null}>
              <SectionsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
