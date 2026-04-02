'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  stars: number;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}

export function TestimonialsColumn({
  testimonials,
  duration = 20,
  className = '',
}: TestimonialsColumnProps) {
  // Duplicate the list so the scroll loops seamlessly
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className={`flex-1 min-w-[280px] max-w-[360px] overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
        className="flex flex-col gap-5"
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            {/* Stars */}
            <div className="mb-3 flex gap-0.5 text-sm" style={{ color: '#4e6645' }}>
              {Array.from({ length: t.stars }, (_, j) => (
                <span key={j}>★</span>
              ))}
            </div>

            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              {t.text}
            </p>

            <div className="flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="h-9 w-9 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#1a1a24' }}>
                  {t.name}
                </p>
                <p className="text-xs" style={{ color: '#94a3b8' }}>
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
