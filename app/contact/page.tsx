import { Button } from "@/components/button";
import { categories } from "@/data/treatments";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <p className="micro-label">Contact</p>
        <h1 className="display">Reserve your visit</h1>
        <p className="body-copy">
          The form UI is ready for Phase 4, when the email provider and destination
          address are confirmed.
        </p>
      </section>
      <section className="section-pad">
        <div className="container contact-grid">
          <aside className="detail-panel">
            <h2 className="display">Start with WhatsApp</h2>
            <p>
              For launch, service pages already include WhatsApp deep-links with a
              prefilled booking message.
            </p>
            <Button href="https://wa.me/639452347667?text=Hi%20Elle%20De%20Marrer%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank">
              Message Us
            </Button>
          </aside>

          <form className="detail-panel form-grid">
            <div className="field">
              <label className="micro-label" htmlFor="name">
                Full Name
              </label>
              <input id="name" name="name" placeholder="Jane Dela Cruz" type="text" />
            </div>
            <div className="field">
              <label className="micro-label" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" placeholder="jane@email.com" type="email" />
            </div>
            <div className="field">
              <label className="micro-label" htmlFor="treatment">
                Treatment
              </label>
              <select id="treatment" name="treatment" defaultValue="">
                <option disabled value="">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.slug}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="micro-label" htmlFor="message">
                Message
              </label>
              <textarea id="message" name="message" placeholder="Tell us what you are looking for..." />
            </div>
            <Button type="button">Submit Inquiry</Button>
          </form>
        </div>
      </section>
    </>
  );
}
