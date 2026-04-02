'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? '#1a1a24';
  const colorDesignation = colors.designation ?? '#94a3b8';
  const colorTestimony = colors.testimony ?? '#5a5a6a';
  const colorArrowBg = colors.arrowBackground ?? '#1a1a24';
  const colorArrowFg = colors.arrowForeground ?? '#f1f1f7';
  const colorArrowHoverBg = colors.arrowHoverBackground ?? '#4e6645';
  const fontSizeName = fontSizes.name ?? '1.35rem';
  const fontSizeDesignation = fontSizes.designation ?? '0.825rem';
  const fontSizeQuote = fontSizes.quote ?? '1rem';

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const len = useMemo(() => testimonials.length, [testimonials]);
  const active = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => setActiveIndex((p) => (p + 1) % len), 5000);
    }
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [autoplay, len]);

  const handleNext = useCallback(() => {
    setActiveIndex((p) => (p + 1) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  const handlePrev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + len) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const stickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + len) % len === index;
    const isRight = (activeIndex + 1) % len === index;
    if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: 'auto', transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
    if (isLeft) return { zIndex: 2, opacity: 1, pointerEvents: 'auto', transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`, transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
    if (isRight) return { zIndex: 2, opacity: 1, pointerEvents: 'auto', transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`, transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div style={{ width: '100%', padding: '1rem 0' }}>
      <div style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>

        {/* Images */}
        <div
          ref={imageContainerRef}
          style={{ position: 'relative', width: '100%', height: '22rem', perspective: '1000px' }}
        >
          {testimonials.map((t, i) => (
            <img
              key={t.src}
              src={t.src}
              alt={t.name}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.14)',
                ...getImageStyle(i),
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#4e6645', fontSize: '14px' }}>★</span>
                ))}
              </div>

              <motion.p style={{ color: colorTestimony, fontSize: fontSizeQuote, lineHeight: 1.75, marginBottom: '1.5rem' }}>
                {active.quote.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.02 * i }}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              <h3 style={{ color: colorName, fontSize: fontSizeName, fontWeight: 600, marginBottom: '0.2rem' }}>
                {active.name}
              </h3>
              <p style={{ color: colorDesignation, fontSize: fontSizeDesignation, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {active.designation}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows + dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Précédent"
              style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg, transition: 'background-color 0.25s' }}
            >
              <FaArrowLeft size={14} color={colorArrowFg} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Suivant"
              style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg, transition: 'background-color 0.25s' }}
            >
              <FaArrowRight size={14} color={colorArrowFg} />
            </button>
            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{ border: 'none', cursor: 'pointer', padding: 0, borderRadius: '9999px', width: i === activeIndex ? '20px' : '6px', height: '6px', background: i === activeIndex ? '#4e6645' : 'rgba(26,26,36,0.15)', transition: 'all 0.3s' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
