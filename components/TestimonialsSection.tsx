'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Miami Beach',
    rating: 5,
    text: 'Absolutely incredible experience. The convenience of having a spa-quality massage in my own home was a game-changer. Professional, punctual, and the massage itself was heavenly.',
  },
  {
    name: 'James & Emily R.',
    location: 'Fort Lauderdale',
    rating: 5,
    text: 'We booked a couples massage for our anniversary and it exceeded all expectations. The setup was seamless and the atmosphere created in our living room was pure tranquility.',
  },
  {
    name: 'Dr. Michael T.',
    location: 'Palm Beach',
    rating: 5,
    text: 'As someone with a demanding schedule, having Áurea Essence come to my home has been invaluable. The quality rivals any five-star spa I\'ve visited.',
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
    <section className="py-16 sm:py-20 md:py-24 bg-champagne-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-base text-charcoal/60 max-w-xl mx-auto">
            Experiences that speak for themselves
          </p>
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
              className="bg-white rounded-sm p-6 sm:p-8 shadow-soft hover:shadow-elegant transition-all duration-300 border-t-2 border-gold-400"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= testimonial.rating} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-charcoal/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-champagne-300 pt-4">
                <p className="font-serif font-medium text-charcoal text-sm">
                  {testimonial.name}
                </p>
                <p className="text-charcoal/50 text-xs">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
