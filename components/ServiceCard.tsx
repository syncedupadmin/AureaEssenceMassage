import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function ServiceCard({ title, description, imageSrc, imageAlt }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-serif font-medium text-charcoal mb-2 tracking-wide">
          {title}
        </h3>
        <p className="text-charcoal/70 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
