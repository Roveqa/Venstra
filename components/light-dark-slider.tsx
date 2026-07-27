"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// The source SVGs carry a transparent gutter around the visible card
// (space originally reserved for the drop shadow blur): the card sits at
// x=21.6136, y=19.951, size 1222x700.104, inside a 1266x744 canvas.
// We crop that gutter out by rendering the SVG larger than its wrapper
// and shifting it, so the wrapper's own box exactly matches the card.
const CARD_X = 21.6136;
const CARD_Y = 19.951;
const CARD_W = 1222;
const CARD_H = 700.104;
const CANVAS_W = 1266;
const CANVAS_H = 744;

const SVG_WIDTH_PCT = (CANVAS_W / CARD_W) * 100;
const SVG_HEIGHT_PCT = (CANVAS_H / CARD_H) * 100;
const SVG_LEFT_PCT = -(CARD_X / CARD_W) * 100;
const SVG_TOP_PCT = -(CARD_Y / CARD_H) * 100;

export const LightDarkSlider = forwardRef<
  HTMLDivElement,
  { lightSrc: string; darkSrc: string; style?: React.CSSProperties }
>(function LightDarkSlider({ lightSrc, darkSrc, style }, forwardedRef) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef(50);
  const rafRef = useRef(0);

  // The two mockup SVGs are ~1MB each. Fetching them client-side (instead of
  // passing their text as server-rendered props) keeps that weight out of
  // both the initial HTML and the RSC hydration payload — passing large
  // strings as props to a client component makes Next.js serialize them a
  // second time for hydration, nearly doubling the page's transfer size.
  const [lightSvg, setLightSvg] = useState<string | null>(null);
  const [darkSvg, setDarkSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    function stripShadowFilter(svg: string) {
      return svg.replace(/ filter="url\(#filter0_d_[^)]*\)"/, "");
    }
    Promise.all([
      fetch(lightSrc).then((res) => res.text()),
      fetch(darkSrc).then((res) => res.text()),
    ]).then(([light, dark]) => {
      if (cancelled) return;
      setLightSvg(stripShadowFilter(light));
      setDarkSvg(stripShadowFilter(dark));
    });
    return () => {
      cancelled = true;
    };
  }, [lightSrc, darkSrc]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const EASE = "left 320ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 320ms cubic-bezier(0.22, 1, 0.36, 1)";

    function setTransition(on: boolean) {
      const value = on ? EASE : "none";
      if (overlayRef.current) overlayRef.current.style.transition = value;
      if (lineRef.current) lineRef.current.style.transition = value;
    }

    function apply() {
      const percent = percentRef.current;
      if (overlayRef.current) {
        overlayRef.current.style.clipPath = `inset(0 0 0 ${percent}%)`;
      }
      if (lineRef.current) {
        lineRef.current.style.left = `${percent}%`;
      }
    }

    function handleMove(clientX: number) {
      setTransition(false);
      const rect = el!.getBoundingClientRect();
      percentRef.current = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(apply);
    }

    function onMouseMove(e: MouseEvent) {
      handleMove(e.clientX);
    }
    function onTouchMove(e: TouchEvent) {
      handleMove(e.touches[0].clientX);
    }
    function onLeave() {
      cancelAnimationFrame(rafRef.current);
      setTransition(true);
      percentRef.current = 50;
      apply();
    }

    apply();
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchend", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchend", onLeave);
    };
  }, []);

  // A 1px overscan on every edge absorbs any sub-pixel rounding drift
  // between the container's aspect-ratio height and the percentage-sized
  // svg, so no sliver of the page background can show through at the edges.
  const svgWrapperStyle = {
    position: "absolute" as const,
    left: `calc(${SVG_LEFT_PCT}% - 1px)`,
    top: `calc(${SVG_TOP_PCT}% - 1px)`,
    width: `calc(${SVG_WIDTH_PCT}% + 2px)`,
    height: `calc(${SVG_HEIGHT_PCT}% + 2px)`,
  };

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef)
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className="relative w-full max-w-[1222px] cursor-col-resize select-none rounded-2xl shadow-[0px_1.663px_21.614px_0px_rgba(196,196,196,0.2)]"
      style={{ aspectRatio: `${CARD_W} / ${CARD_H}`, ...style }}
    >
      {/* Clipping lives on its own layer, separate from the shadow-bearing
          container above: Safari can fail to clip a rounded overflow-hidden
          box to its border-radius when that same element also carries a
          box-shadow, so the shadow and the clip must not share an element. */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#f8f8f8]">
        {lightSvg && (
          <div
            className="light-dark-slider-svg"
            style={svgWrapperStyle}
            dangerouslySetInnerHTML={{ __html: lightSvg }}
          />
        )}

        <div
          ref={overlayRef}
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        >
          {darkSvg && (
            <div
              className="light-dark-slider-svg"
              style={svgWrapperStyle}
              dangerouslySetInnerHTML={{ __html: darkSvg }}
            />
          )}
        </div>

        <div
          ref={lineRef}
          className="pointer-events-none absolute inset-y-0 w-[2px] bg-white"
          style={{ left: "50%" }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5 3L1.5 8L5 13M11 3L14.5 8L11 13"
                stroke="#040404"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});
