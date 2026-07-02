import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { TreatmentCard } from "@/components/treatment-card";
import { categories, treatments } from "@/data/treatments";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  return {
    title: category ? category.label : "Treatments"
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryTreatments = treatments.filter((treatment) => treatment.category === category.slug);

  return (
    <>
      <section className="page-hero">
        <p className="micro-label">{category.label}</p>
        <h1 className="display">{category.description}</h1>
        <p className="body-copy">
          Each service is wired from typed data so this page, treatment detail pages,
          and the tablet catalog share one source of truth.
        </p>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading eyebrow="Services" title={`Explore ${category.label}`} align="left" />
          <div className="treatment-grid">
            {categoryTreatments.map((treatment) => (
              <TreatmentCard key={treatment.slug} treatment={treatment} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
