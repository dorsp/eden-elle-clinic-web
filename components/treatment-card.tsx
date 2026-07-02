import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { ImagePanel } from "@/components/image-panel";
import type { Treatment } from "@/data/treatments";

type TreatmentCardProps = {
  treatment: Treatment;
};

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <article className="treatment-card">
      <ImagePanel
        label={treatment.image.label}
        className="treatment-card__image"
        tone={treatment.image.tone}
      />
      <div className="treatment-card__body">
        <p className="micro-label">{treatment.categoryLabel}</p>
        <h3 className="display">{treatment.name}</h3>
        <p>{treatment.summary}</p>
        <div className="treatment-card__footer">
          <span className="display">{treatment.price}</span>
          <Button variant="tertiary" href={treatment.whatsappUrl} target="_blank">
            Book <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}
