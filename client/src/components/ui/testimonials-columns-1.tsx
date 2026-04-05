'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
  stars?: number;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, stars }, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-slate-100 shadow-sm bg-white/90 backdrop-blur-sm max-w-xs w-full"
              >
                {stars && (
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: stars }).map((_, j) => (
                      <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                )}
                <p className="text-sm text-slate-600 leading-relaxed font-light">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={36}
                    height={36}
                    src={image}
                    alt={name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-slate-800 leading-5">{name}</div>
                    <div className="text-xs text-slate-400 leading-5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
