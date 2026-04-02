'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe, { COBEOptions } from 'cobe';
import { cn } from '@/lib/utils';
import DottedMap from 'dotted-map';

/* ─── 3D Globe (kept for backwards compat) ───────────────────── */

const QUEBEC_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  phi: 1.05,
  theta: 0.25,
  dark: 0,
  diffuse: 0.5,
  mapSamples: 20000,
  mapBrightness: 1.4,
  devicePixelRatio: 2,
  baseColor: [1, 1, 1],
  markerColor: [30 / 255, 30 / 255, 30 / 255],
  glowColor: [0.96, 0.96, 0.96],
  markers: [
    { location: [45.5019, -73.5674], size: 0.04 }, // Montréal only
  ],
};

export function Globe({
  className,
  config = QUEBEC_GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(config.phi ?? 1.05);
  const pointerDown = useRef<number | null>(null);
  const pointerDelta = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(false);

  const updatePointer = (val: number | null) => {
    pointerDown.current = val;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = val !== null ? 'grabbing' : 'grab';
    }
  };

  const handleMove = (clientX: number) => {
    if (pointerDown.current !== null) {
      const delta = clientX - pointerDown.current;
      pointerDelta.current = delta;
      setRotation(delta / 200);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let width = canvas.offsetWidth;
    const onResize = () => { width = canvas.offsetWidth; };
    window.addEventListener('resize', onResize);
    let animId: number;
    const globe = createGlobe(canvas, { ...config, width: width * 2, height: width * 2 });
    const tick = () => {
      if (pointerDown.current === null) phiRef.current += 0.004;
      globe.update({ phi: phiRef.current + rotation, width: width * 2, height: width * 2 });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    setTimeout(() => setVisible(true), 100);
    return () => { globe.destroy(); cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation]);

  return (
    <div className={cn('absolute inset-0 mx-auto aspect-square w-full max-w-[600px]', className)}>
      <canvas
        ref={canvasRef}
        className="size-full transition-opacity duration-700 [contain:layout_paint_size]"
        style={{ opacity: visible ? 1 : 0 }}
        onPointerDown={(e) => updatePointer(e.clientX - pointerDelta.current)}
        onPointerUp={() => updatePointer(null)}
        onPointerOut={() => updatePointer(null)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
      />
    </div>
  );
}

/* ─── Flat North America dotted map ─────────────────────────── */

// Build once — DottedMap is pure/sync, safe at module level
const _map = new DottedMap({ height: 80, grid: 'diagonal' });
const _allPoints = _map.getPoints();

// For height=80, the coordinate space is approx: x 0–174, y 0–84
// North America x/y bounds (equirectangular): x 4–63, y 7–36
const naPoints = _allPoints.filter(
  (p) => p.x >= 4 && p.x <= 63 && p.y >= 7 && p.y <= 36
);

// Fixed viewBox tightly cropped to NA
const VB_X = 3.5;
const VB_Y = 6.5;
const VB_W = 60;
const VB_H = 30;

// Montréal position in this coordinate space
// x = (lng+180)/360 * 174 = (106.4/360)*174 ≈ 51.4
// y = (90-lat)/180 * 84  = (44.5/180)*84  ≈ 20.8
const MTL_X = 51.4;
const MTL_Y = 20.8;

export function FlatNAMap({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <svg
        viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
        width="100%"
        height="100%"
        aria-hidden
        style={{ display: 'block' }}
      >
        {/* Dots */}
        {naPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={0.22} fill="#4e6645" opacity={0.3} />
        ))}

        {/* Single marker — Montréal */}
        <circle cx={MTL_X} cy={MTL_Y} r={1.2} fill="none" stroke="#4e6645" strokeWidth={0.35} opacity={0.7}>
          <animate attributeName="r" values="1.2;3.2;1.2" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx={MTL_X} cy={MTL_Y} r={0.7} fill="none" stroke="#4e6645" strokeWidth={0.25} opacity={0.5}>
          <animate attributeName="r" values="0.7;1.8;0.7" dur="2.6s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={MTL_X} cy={MTL_Y} r={0.55} fill="#4e6645" />
      </svg>
    </div>
  );
}
