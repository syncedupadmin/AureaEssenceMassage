'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Maria L.',
    location: 'Coral Gables',
    rating: 5,
    text: 'Absolutely exceptional. My home was transformed into a private sanctuary. This is luxury redefined.',
  },
  {
    name: 'James R.',
    location: 'Miami Beach',
    rating: 5,
    text: "I've been to the best spas in Miami. This surpasses them all—and I never left my living room.",
  },
  {
    name: 'Ashley T.',
    location: 'Brickell',
    rating: 5,
    text: 'Booked for my bridal party and it was the highlight of the weekend. Pure elegance.',
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-gold-500' : 'text-charcoal-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-champagne-100 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/generated/bg-testimonials.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Gold decorative element */}
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
            What Our Clients Say
          </h2>
          {/* Star rating header */}
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-charcoal/50 text-sm">5.0 average from 50+ reviews</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-sm p-6 sm:p-8 shadow-soft hover:shadow-elegant transition-all duration-300 border-t-2 border-gold-400"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 text-gold-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote */}
              <blockquote className="text-charcoal/70 text-sm leading-relaxed mb-6 italic font-serif">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= testimonial.rating} />
                ))}
              </div>

              {/* Author */}
              <p className="font-medium text-charcoal text-sm">
                {testimonial.name}
              </p>
              <p className="text-charcoal/50 text-xs">
                {testimonial.location}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
