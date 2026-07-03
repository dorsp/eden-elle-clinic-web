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
      // On phones, skip the GPU-heavy blur filters and background parallax.
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const softBlur = isMobile ? "blur(0px)" : "blur(8px)";
      const heroBlur = isMobile ? "blur(0px)" : "blur(10px)";

      if (reduceMotion) {
        gsap.set("[data-gsap], [data-reveal], [data-stagger] > *", {
          autoAlpha: 1,
          clearProps: "transform,filter,clipPath"
        });
        document
          .querySelectorAll(".section-heading")
          .forEach((element) => element.classList.add("is-revealed"));
        return;
      }

      gsap.fromTo(
        ".site-header",
        { autoAlpha: 0, y: -20 },
        {
          autoAlpha: 1,
          clearProps: "transform",
          duration: 0.85,
          ease: "power3.out",
          y: 0
        }
      );

      // Subtle page-enter fade on route change
      gsap.fromTo(
        "main",
        { autoAlpha: 0.5, y: 14 },
        { autoAlpha: 1, duration: 0.6, ease: "power2.out", y: 0, clearProps: "transform" }
      );

      // Section eyebrows: draw the champagne underline in on scroll
      gsap.utils.toArray<HTMLElement>(".section-heading").forEach((heading) => {
        ScrollTrigger.create({
          once: true,
          start: "top 85%",
          trigger: heading,
          onEnter: () => heading.classList.add("is-revealed")
        });
      });

      // Philosophy quote: reveal word by word
      const quote = document.querySelector<HTMLElement>(".quote-band blockquote");
      if (quote && !quote.dataset.split) {
        quote.dataset.split = "true";
        const words = (quote.textContent ?? "").trim().split(/\s+/);
        quote.innerHTML = words
          .map((word) => `<span class="word">${word}</span>`)
          .join(" ");
        gsap.fromTo(
          quote.querySelectorAll(".word"),
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.045,
            y: 0,
            scrollTrigger: { once: true, start: "top 80%", trigger: quote }
          }
        );
      }

      // Magnetic pull on primary calls-to-action (hover-capable devices only)
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const magnets = canHover
        ? gsap.utils.toArray<HTMLElement>(
            ".button--primary, .button--light, .site-header__book"
          )
        : [];
      const magnetCleanups: Array<() => void> = [];
      magnets.forEach((magnet) => {
        const xTo = gsap.quickTo(magnet, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(magnet, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (event: PointerEvent) => {
          const rect = magnet.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * 0.3);
          yTo((event.clientY - (rect.top + rect.height / 2)) * 0.4);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        magnet.addEventListener("pointermove", onMove);
        magnet.addEventListener("pointerleave", onLeave);
        magnetCleanups.push(() => {
          magnet.removeEventListener("pointermove", onMove);
          magnet.removeEventListener("pointerleave", onLeave);
        });
      });

      // Cursor-following spotlight on cards
      const spotlightCards = gsap.utils.toArray<HTMLElement>(
        ".treatment-card, .location-card"
      );
      const spotlightCleanups: Array<() => void> = [];
      spotlightCards.forEach((card) => {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
          card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        };
        card.addEventListener("pointermove", onMove);
        spotlightCleanups.push(() => card.removeEventListener("pointermove", onMove));
      });

      if (pathname === "/") {
        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });

        hero
          .fromTo(
            ".hero [data-hero-item]",
            { autoAlpha: 0, filter: heroBlur, y: 28 },
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
          { autoAlpha: 0, filter: heroBlur, y: 28 },
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
            { autoAlpha: 0, filter: heroBlur, y: 32 },
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
            { autoAlpha: 0, filter: softBlur, y: 38 },
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

      if (!isMobile) {
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
      }

      // gsap.context honors a returned cleanup on revert (route change / unmount)
      return () => {
        magnetCleanups.forEach((cleanup) => cleanup());
        spotlightCleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
