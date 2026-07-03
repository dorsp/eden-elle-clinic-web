"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePanel } from "@/components/image-panel";
import type { Treatment, TreatmentCategory } from "@/data/treatments";

type CatalogExperienceProps = {
  categories: TreatmentCategory[];
  treatments: Treatment[];
};

export function CatalogExperience({ categories, treatments }: CatalogExperienceProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeCategory = categories.find((category) => category.slug === activeSlug) ?? categories[0];
  const activeTreatments = useMemo(
    () => treatments.filter((treatment) => treatment.category === activeSlug),
    [activeSlug, treatments]
  );
  const activeTreatment = activeTreatments[activeIndex] ?? activeTreatments[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [activeSlug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          activeTreatments.length ? (index + 1) % activeTreatments.length : 0
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          activeTreatments.length ? (index - 1 + activeTreatments.length) % activeTreatments.length : 0
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTreatments.length]);

  useGSAP(
    () => {
      if (!stageRef.current) {
        return;
      }

      const softBlur = window.matchMedia("(max-width: 760px)").matches
        ? "blur(0px)"
        : "blur(8px)";

      gsap.fromTo(
        stageRef.current.children,
        { autoAlpha: 0, filter: softBlur, y: 26 },
        { autoAlpha: 1, duration: 0.75, ease: "power3.out", filter: "blur(0px)", stagger: 0.08, y: 0 }
      );
    },
    { dependencies: [activeSlug, activeIndex], scope: stageRef }
  );

  const goNext = () => {
    setActiveIndex((index) => (activeTreatments.length ? (index + 1) % activeTreatments.length : 0));
  };

  const goPrev = () => {
    setActiveIndex((index) =>
      activeTreatments.length ? (index - 1 + activeTreatments.length) % activeTreatments.length : 0
    );
  };

  return (
    <div className="catalog-experience">
      <div className="catalog__grid" role="tablist" aria-label="Treatment categories">
        {categories.map((category, index) => {
          const isActive = category.slug === activeSlug;

          return (
            <button
              aria-selected={isActive}
              className="catalog-tile"
              key={category.slug}
              onClick={() => setActiveSlug(category.slug)}
              role="tab"
              type="button"
            >
              <p className="micro-label">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h2 className="display">{category.label}</h2>
                <p>{category.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="catalog-stage" ref={stageRef}>
        <div className="catalog-stage__media">
          <ImagePanel
            label={activeTreatment?.image.label ?? activeCategory?.image.label ?? "consultation menu"}
            tone={activeTreatment?.image.tone ?? activeCategory?.image.tone ?? "clinic"}
          />
        </div>

        <div className="catalog-stage__content">
          <p className="micro-label">{activeCategory?.label}</p>
          <h2 className="display">{activeTreatment?.name ?? "Consultation-led menu"}</h2>
          <p>{activeTreatment?.tagline ?? "Placeholder services can be added in the typed data file."}</p>

          {activeTreatment ? (
            <>
              <div className="catalog-benefit-row">
                {activeTreatment.benefits.map((benefit) => (
                  <span key={benefit}>{benefit}</span>
                ))}
              </div>
              <div className="catalog-stage__meta">
                <span className="display">{activeTreatment.price}</span>
                <span>{activeTreatment.duration}</span>
              </div>
              <p className="catalog-practitioner-note">{activeTreatment.practitionerNote}</p>
              <a className="catalog-book-link" href={activeTreatment.whatsappUrl} target="_blank">
                Book this ritual <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </>
          ) : null}
        </div>

        <div className="catalog-stage__rail">
          <div className="catalog-progress">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div>
              <i
                style={{
                  transform: `scaleX(${
                    activeTreatments.length ? (activeIndex + 1) / activeTreatments.length : 1
                  })`
                }}
              />
            </div>
            <span>{String(Math.max(activeTreatments.length, 1)).padStart(2, "0")}</span>
          </div>

          <div className="catalog-controls" aria-label="Service controls">
            <button onClick={goPrev} type="button" aria-label="Previous service">
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <button onClick={goNext} type="button" aria-label="Next service">
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="catalog-service-list">
            {activeTreatments.map((treatment, index) => (
              <button
                aria-current={index === activeIndex}
                key={treatment.slug}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{treatment.name}</span>
                <small>{treatment.price}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
