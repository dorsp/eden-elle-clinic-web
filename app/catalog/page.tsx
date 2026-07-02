import { CatalogExperience } from "@/components/catalog-experience";
import { LogoWordmark } from "@/components/logo-wordmark";
import { categories, treatments } from "@/data/treatments";

export const metadata = {
  title: "Tablet Catalog"
};

export default function CatalogPage() {
  return (
    <section className="catalog">
      <div className="catalog__top">
        <LogoWordmark />
        <p className="micro-label">In-Clinic Treatment Catalog</p>
      </div>

      <div className="catalog__intro">
        <h1 className="display">Select a ritual</h1>
        <p>
          A first tablet-mode pass for staff-led service discovery. The next phase
          can add swipeable service slides, overlays, and auto-advance behavior on
          top of this same data.
        </p>
      </div>

      <CatalogExperience categories={categories} treatments={treatments} />
    </section>
  );
}
