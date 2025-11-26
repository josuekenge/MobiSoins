import { useState, useEffect, useRef } from 'react';
import { Star, MapPin, Users, Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2.5, separator = '' }: { 
  value: number; 
  suffix?: string; 
  duration?: number;
  separator?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * value);
        setCount(currentCount);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (separator && num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
};

export const Trust = () => {
  const stats = [
    { value: 500, suffix: '+', label: 'Infirmières Certifiées', icon: <Users className="h-8 w-8" /> },
    { value: 10000, suffix: '+', label: 'Soins Complétés', icon: <Heart className="h-8 w-8" />, separator: ',' },
    { value: 4.9, suffix: '/5', label: 'Évaluation Moyenne', icon: <Star className="h-8 w-8" /> },
    { value: 25, suffix: '+', label: 'Villes Couvertes', icon: <MapPin className="h-8 w-8" /> },
  ];

  const testimonials = [
    {
      quote: "Un service exceptionnel! L'infirmière est arrivée à l'heure et a pris soin de ma mère avec professionnalisme. Je recommande fortement MobiSoins.",
      author: "Marie L.",
      role: "Montréal • Patiente depuis 6 mois",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      quote: "MobiSoins me permet de gérer mon horaire comme je le veux. C'est la liberté que je cherchais. Les paiements sont rapides et le support est excellent.",
      author: "Sophie B.",
      role: "Québec • Infirmière Partenaire",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      quote: "Parfait pour les parents occupés. Mon fils a reçu ses vaccins à la maison sans stress. L'application est simple et les prix sont transparents.",
      author: "Jean-Marc T.",
      role: "Laval • Parent",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=33",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="trust" className="relative bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            Pourquoi Plus de{' '}
            <span className="text-navy-800">10,000 Québécois</span>
            {' '}Font Confiance à MobiSoins?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme fiable qui connecte les patients avec des professionnels
            de la santé certifiés à travers le Québec.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:border-navy-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-50 rounded-full mb-4">
                <div className="text-navy-800">
                  {stat.icon}
                </div>
              </div>
              <div className="text-5xl font-bold text-navy-900 mb-2">
                {stat.value === 4.9 ? (
                  '4.9/5'
                ) : (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} separator={stat.separator} />
                )}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: currentTestimonial === index ? 1 : 0,
                  x: currentTestimonial === index ? 0 : 50,
                }}
                transition={{ duration: 0.5 }}
                className={currentTestimonial === index ? 'block' : 'hidden'}
              >
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-10 lg:p-12 shadow-sm">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-2xl lg:text-3xl text-navy-900 font-medium leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full border-4 border-gray-100 object-cover"
                    />
                    <div>
                      <div className="text-navy-900 font-semibold text-lg">{testimonial.author}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === index
                      ? 'bg-navy-800 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Map Teaser */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5 text-navy-800" />
            <span>Carte de Couverture</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Montréal • Québec • Laval • Gatineau • Longueuil • Sherbrooke
            <br />
            <span className="text-navy-800 font-semibold">+ 19 autres villes</span>
          </p>
        </div>
      </div>
    </section>
  );
};
