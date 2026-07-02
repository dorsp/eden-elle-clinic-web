import { ImagePanel } from "@/components/image-panel";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <p className="micro-label">About</p>
        <h1 className="display">Beauty with quiet confidence</h1>
        <p className="body-copy">
          Elle De Marrer is being shaped as a warm, editorial, and tactile clinic
          experience where visible results meet ethical care.
        </p>
      </section>
      <section className="split-feature">
        <ImagePanel label="clinic story image placeholder" />
        <div className="split-feature__content">
          <p className="micro-label">Brand Essence</p>
          <h2 className="display">
            Assured, warm,
            <br />
            understated
          </h2>
          <p className="body-copy">
            The site language follows the supplied brand system: warm monochrome
            surfaces, generous whitespace, refined typography, and champagne accents
            used with restraint.
          </p>
          <p className="body-copy">
            Final founder story, treatment philosophy, certifications, and clinic
            photography can drop into this structure without reworking the page.
          </p>
        </div>
      </section>
    </>
  );
}
