import MainLayout from "@/layouts/MainLayout";

/**
 * Portfolio layout: renders MainLayout with the custom HeaderPortfolio navbar
 * (headerStyle 99) and footer style 2, matching the original design.
 */
export default function PortfolioLayout() {
  return <MainLayout headerStyle={99} footerStyle={2} />;
}
