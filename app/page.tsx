import { Button } from "@/components/button";
import { ImagePanel } from "@/components/image-panel";
import { SectionHeading } from "@/components/section-heading";
import { TreatmentCard } from "@/components/treatment-card";
import { TrustMarquee } from "@/components/trust-marquee";
import { branches } from "@/data/locations";
import { featuredTreatments } from "@/data/treatments";

const proofPoints = [
  {
    label: "Doctor-guided",
    title: "Plans before procedures",
    body: "Advanced treatments begin with suitability, timing, and natural-looking outcomes in mind."
  },
  {
    label: "Vegan protocols",
    title: "Ethical, tactile care",
    body: "Products and rituals are selected for gentle performance, comfort, and responsible beauty."
  },
  {
    label: "Aftercare-first",
    title: "Confidence beyond the room",
    body: "Guests leave with clear recovery, hydration, SPF, and maintenance guidance."
  }
];

const journeySteps = [
  {
    title: "Consult",
    body: "We listen first, map your goals, and recommend only what fits your skin and schedule."
  },
  {
    title: "Treat",
    body: "Each protocol is delivered with quiet precision, warm pacing, and a calm clinical standard."
  },
  {
    title: "Maintain",
    body: "Aftercare and cadence keep results polished without pushing the skin too far."
  }
];

export default function Home() {
  return (
    <>
      <section className="hero hero--editorial">
        <div className="hero__content">
          <p className="micro-label" data-hero-item>
            Vegan - Clinical - Luxury Skincare
          </p>
          <h1 className="display" data-hero-item>
            Elevating beauty forward
          </h1>
          <p className="body-copy" data-hero-item>
            A serene clinical experience where every treatment becomes a ritual of
            tranquility, rejuvenation, and lasting results.
          </p>
          <div className="hero__actions" data-hero-item>
            <Button href="/contact">Book a Consultation</Button>
            <Button href="/treatments" variant="secondary">
              View Treatments
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <ImagePanel
            className="hero__image hero-visual__main"
            label="warm editorial clinic portrait"
            tone="clinic"
          />
          <div className="hero-visual__card" data-hero-item>
            <p className="micro-label">Consultation First</p>
            <p>
              Care is planned around your skin, your pace, and results that still
              look like you.
            </p>
          </div>
        </div>
      </section>

      <TrustMarquee />

      <section className="quote-band dark-band">
        <blockquote>
          "Cheer up, care more, and elevate your beauty, because beauty is power."
        </blockquote>
        <p className="micro-label">The Elle De Marrer Philosophy</p>
      </section>

      <section className="editorial-proof section-pad">
        <div className="container editorial-proof__layout">
          <div>
            <p className="micro-label">Why Elle</p>
            <h2 className="display">Clinical calm, finished with editorial restraint.</h2>
          </div>
          <div className="proof-grid">
            {proofPoints.map((point) => (
              <article className="proof-card" key={point.title}>
                <p className="micro-label">{point.label}</p>
                <h3 className="display">{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading eyebrow="Signature Treatments" title="Rituals crafted for you" />
          <div className="treatment-grid">
            {featuredTreatments.map((treatment) => (
              <TreatmentCard key={treatment.slug} treatment={treatment} />
            ))}
          </div>
        </div>
      </section>

      <section className="split-feature split-feature--editorial">
        <ImagePanel label="premium skincare and treatment products" tone="ritual" />
        <div className="split-feature__content">
          <p className="micro-label">Clean, Effective, Ethical</p>
          <h2 className="display">
            Premium care,
            <br />
            gentle on skin
          </h2>
          <p className="body-copy">
            Every formula and protocol is vegan-friendly, organic, and certified,
            crafted with only the finest ingredients so your skin receives the best
            possible care.
          </p>
          <p className="body-copy">Beauty, elevated ethically and responsibly.</p>
          <a className="text-link" href="/about">
            Discover Our Approach -&gt;
          </a>
        </div>
      </section>

      <section className="journey-section section-pad">
        <div className="container journey-layout">
          <div>
            <p className="micro-label">Client Journey</p>
            <h2 className="display">A clear path from consultation to aftercare.</h2>
          </div>
          <div className="journey-list">
            {journeySteps.map((step, index) => (
              <article key={step.title}>
                <span className="display">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading eyebrow="Find Us" title="Two clinics, one ritual" />
          <div className="locations-grid">
            {branches.map((branch) => (
              <article className="location-card" key={branch.slug}>
                <ImagePanel label={branch.imageAlt} tone="clinic" />
                <div className="location-card__body">
                  <p className="micro-label">{branch.label}</p>
                  <h3 className="display">{branch.name}</h3>
                  <div className="location-card__details">
                    <div>
                      <p className="micro-label">Address</p>
                      <p>{branch.address}</p>
                    </div>
                    <div>
                      <p className="micro-label">Hours</p>
                      <p>{branch.hours}</p>
                    </div>
                  </div>
                  <a className="text-link" href={branch.mapUrl} target="_blank">
                    Get Directions -&gt;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-cta dark-band">
        <p className="micro-label">Begin Your Ritual</p>
        <h2 className="display">
          Book a consultation
          <br />
          at Iloilo or Boracay
        </h2>
        <Button href="/contact" variant="light">
          Reserve Your Visit
        </Button>
      </section>
    </>
  );
}
