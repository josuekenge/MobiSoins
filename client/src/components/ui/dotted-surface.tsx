'use client';

export function DottedSurface() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(0,51,102,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
  );
}
