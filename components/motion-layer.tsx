"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function MotionLayer() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set("[data-gsap], [data-reveal], [data-stagger] > *", {
          autoAlpha: 1,
          clearProps: "transform,filter,clipPath"
        });
        return;
      }

      gsap.fromTo(
        ".site-header",
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, duration: 0.85, ease: "power3.out", y: 0 }
      );

      if (pathname === "/") {
        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });

        hero
          .fromTo(
            ".hero [data-hero-item]",
            { autoAlpha: 0, filter: "blur(10px)", y: 28 },
            { autoAlpha: 1, duration: 1.05, filter: "blur(0px)", stagger: 0.12, y: 0 }
          )
          .fromTo(
            ".hero__image",
            { autoAlpha: 0, clipPath: "inset(8% 0% 8% 0%)", scale: 1.04 },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.35,
              scale: 1
            },
            "-=0.7"
          );
      }

      if (pathname !== "/" && !pathname?.startsWith("/catalog")) {
        gsap.fromTo(
          ".page-hero > *",
          { autoAlpha: 0, filter: "blur(10px)", y: 28 },
          {
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            filter: "blur(0px)",
            stagger: 0.1,
            y: 0
          }
        );
      }

      if (pathname?.startsWith("/catalog")) {
        const catalog = gsap.timeline({ defaults: { ease: "power3.out" } });

        catalog
          .fromTo(".catalog__top", { autoAlpha: 0, y: -18 }, { autoAlpha: 1, duration: 0.85, y: 0 })
          .fromTo(
            ".catalog__intro > *",
            { autoAlpha: 0, filter: "blur(10px)", y: 32 },
            { autoAlpha: 1, duration: 1.05, filter: "blur(0px)", stagger: 0.12, y: 0 },
            "-=0.35"
          )
          .fromTo(
            ".catalog-tile",
            { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)", y: 36 },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              stagger: 0.08,
              y: 0
            },
            "-=0.55"
          );
      }

      gsap.utils
        .toArray<HTMLElement>(
          "[data-reveal], .quote-band, .section-pad, .split-feature, .booking-cta, .detail-layout, .contact-grid"
        )
        .forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, filter: "blur(8px)", y: 38 },
            {
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              filter: "blur(0px)",
              scrollTrigger: {
                once: true,
                start: "top 82%",
                trigger: element
              },
              y: 0
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-stagger], .treatment-grid, .locations-grid, .category-grid")
        .forEach((group) => {
          const items = Array.from(group.children);

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              duration: 0.92,
              ease: "power3.out",
              scrollTrigger: {
                once: true,
                start: "top 82%",
                trigger: group
              },
              stagger: 0.09,
              y: 0
            }
          );
        });

      gsap.utils.toArray<HTMLElement>(".image-panel").forEach((panel) => {
        gsap.to(panel, {
          backgroundPosition: "54% 46%",
          ease: "none",
          scrollTrigger: {
            end: "bottom top",
            scrub: 0.8,
            start: "top bottom",
            trigger: panel
          }
        });
      });
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
