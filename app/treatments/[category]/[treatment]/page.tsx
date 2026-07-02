import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { ImagePanel } from "@/components/image-panel";
import { TreatmentCard } from "@/components/treatment-card";
import { categories, treatments } from "@/data/treatments";

type TreatmentPageProps = {
  params: Promise<{ category: string; treatment: string }>;
};

export function generateStaticParams() {
  return treatments.map((treatment) => ({
    category: treatment.category,
    treatment: treatment.slug
  }));
}

export async function generateMetadata({ params }: TreatmentPageProps) {
  const { treatment: slug } = await params;
  const treatment = treatments.find((item) => item.slug === slug);

  return {
    title: treatment ? treatment.name : "Treatment"
  };
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { category: categorySlug, treatment: treatmentSlug } = await params;
  const treatment = treatments.find(
    (item) => item.category === categorySlug && item.slug === treatmentSlug
  );
  const category = categories.find((item) => item.slug === categorySlug);

  if (!treatment || !category) {
    notFound();
  }

  const relatedTreatments = treatments
    .filter((item) => item.category === treatment.category && item.slug !== treatment.slug)
    .slice(0, 3);

  return (
    <>
      <section className="page-hero treatment-hero">
        <p className="micro-label">{category.label}</p>
        <h1 className="display">{treatment.name}</h1>
        <p className="body-copy">{treatment.tagline}</p>
        <div className="concern-row" aria-label="Treatment concerns">
          {treatment.concerns.map((concern) => (
            <span key={concern}>{concern}</span>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container treatment-detail-layout">
          <div className="treatment-detail-main">
            <ImagePanel
              label={treatment.image.label}
              tone={treatment.image.tone}
              className="treatment-detail-image"
            />

            <section className="detail-panel">
              <p className="micro-label">Overview</p>
              <h2 className="display">A considered protocol for visible calm.</h2>
              <p>{treatment.overview}</p>
              <div className="result-note">
                <p className="micro-label">Expected Result</p>
                <p>{treatment.results}</p>
              </div>
            </section>

            <section className="detail-panel">
              <p className="micro-label">Treatment Journey</p>
              <h2 className="display">What happens during your visit</h2>
              <div className="timeline-list">
                {treatment.timeline.map((step, index) => (
                  <article key={step.title}>
                    <span className="display">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="detail-panel before-after-panel">
              <div>
                <p className="micro-label">Before / After</p>
                <h2 className="display">A space for compliant results</h2>
                <p>
                  This section is designed for approved treatment photography once the
                  clinic has signed client consent and final imagery.
                </p>
              </div>
              <div className="before-after-grid" aria-hidden="true">
                <ImagePanel label="before image placeholder" tone={treatment.image.tone} />
                <ImagePanel label="after image placeholder" tone={treatment.image.tone} />
              </div>
            </section>

            <section className="detail-panel">
              <p className="micro-label">Questions</p>
              <h2 className="display">Before you book</h2>
              <div className="faq-list">
                {treatment.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="booking-sidebar">
            <div className="detail-panel booking-panel">
              <p className="micro-label">{treatment.categoryLabel}</p>
              <h2 className="display">{treatment.price}</h2>
              <div className="leader-list">
                <div>
                  <span>Duration</span>
                  <span>{treatment.duration}</span>
                </div>
                <div>
                  <span>Branch</span>
                  <span>Iloilo / Boracay</span>
                </div>
              </div>
              <Button href={treatment.whatsappUrl} target="_blank" style={{ marginTop: "1.75rem" }}>
                Book on WhatsApp
              </Button>
              <Button href="/contact" variant="secondary" style={{ marginTop: "0.85rem" }}>
                Ask a Question
              </Button>
            </div>

            <div className="detail-panel">
              <p className="micro-label">Best For</p>
              <ul className="info-list">
                {treatment.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-panel">
              <p className="micro-label">Aftercare</p>
              <ul className="info-list">
                {treatment.aftercare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="practitioner-note">
              <p className="micro-label">Practitioner Note</p>
              <p>{treatment.practitionerNote}</p>
            </div>
          </aside>
        </div>
      </section>

      {relatedTreatments.length > 0 ? (
        <section className="section-pad related-section">
          <div className="container">
            <p className="micro-label">Related Treatments</p>
            <h2 className="display">Continue the ritual</h2>
            <div className="treatment-grid">
              {relatedTreatments.map((item) => (
                <TreatmentCard key={item.slug} treatment={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
