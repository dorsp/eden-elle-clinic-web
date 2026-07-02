import { ImagePanel } from "@/components/image-panel";
import { SectionHeading } from "@/components/section-heading";
import { branches } from "@/data/locations";

export const metadata = {
  title: "Locations"
};

export default function LocationsPage() {
  return (
    <>
      <section className="page-hero">
        <p className="micro-label">Locations</p>
        <h1 className="display">Visit Elle De Marrer</h1>
        <p className="body-copy">
          Placeholder branch details for Iloilo and Boracay, ready for final clinic
          addresses, maps, galleries, and contact numbers.
        </p>
      </section>
      <section className="section-pad">
        <div className="container">
          <SectionHeading eyebrow="Clinics" title="Two clinics, one ritual" align="left" />
          <div className="locations-grid">
            {branches.map((branch) => (
              <article className="location-card" key={branch.slug}>
                <ImagePanel label={branch.imageAlt} />
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
                  <a className="text-link" href={`/locations/${branch.slug}`}>
                    View Clinic →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
