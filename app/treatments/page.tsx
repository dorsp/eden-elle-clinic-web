import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { TreatmentCard } from "@/components/treatment-card";
import { categories, treatments } from "@/data/treatments";

export const metadata = {
  title: "Treatments"
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="page-hero">
        <p className="micro-label">Treatments</p>
        <h1 className="display">Clinical rituals for skin and body</h1>
        <p className="body-copy">
          Browse placeholder service categories built to be swapped with the final
          Elle De Marrer menu without changing the site structure.
        </p>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading eyebrow="Categories" title="Choose your path" align="left" />
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link className="category-tile" href={`/treatments/${category.slug}`} key={category.slug}>
                <p className="micro-label">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="display">{category.label}</h2>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading eyebrow="All Services" title="The current placeholder menu" align="left" />
          <div className="treatment-grid">
            {treatments.map((treatment) => (
              <TreatmentCard key={treatment.slug} treatment={treatment} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
