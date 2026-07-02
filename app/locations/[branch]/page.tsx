import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { ImagePanel } from "@/components/image-panel";
import { branches } from "@/data/locations";

type BranchPageProps = {
  params: Promise<{ branch: string }>;
};

export function generateStaticParams() {
  return branches.map((branch) => ({ branch: branch.slug }));
}

export async function generateMetadata({ params }: BranchPageProps) {
  const { branch: slug } = await params;
  const branch = branches.find((item) => item.slug === slug);

  return {
    title: branch ? `${branch.name} Clinic` : "Location"
  };
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { branch: slug } = await params;
  const branch = branches.find((item) => item.slug === slug);

  if (!branch) {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <p className="micro-label">{branch.label}</p>
        <h1 className="display">{branch.name}</h1>
        <p className="body-copy">{branch.address}</p>
      </section>
      <section className="section-pad">
        <div className="container detail-layout">
          <ImagePanel label={branch.imageAlt} />
          <aside className="detail-panel">
            <h2 className="display">Clinic Details</h2>
            <div className="leader-list">
              <div>
                <span>Address</span>
                <span>{branch.address}</span>
              </div>
              <div>
                <span>Hours</span>
                <span>{branch.hours}</span>
              </div>
            </div>
            <Button href={branch.mapUrl} target="_blank" style={{ marginTop: "2rem" }}>
              Get Directions
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
