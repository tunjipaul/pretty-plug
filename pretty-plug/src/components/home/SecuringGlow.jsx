import { Clock, BadgeCheck } from "lucide-react";

export default function SecuringGlow() {
  return (
    <section className="py-32 px-8 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      {/* Left — Text & Widgets */}
      <div className="space-y-12">
        {/* Heading */}
        <div>
          <h2 className="font-headline text-5xl font-bold mb-6">
            Securing Your Glow
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Our studio operates on a premium exclusivity model. All appointments
            require a Paystack deposit to confirm your slot in the artisan's
            chair.
          </p>
        </div>

        {/* Booking Window Widget */}
        <div className="bg-surface-container-high p-8 rounded-xl border-l-4 border-primary">
          <div className="flex items-center gap-4 mb-6">
            <Clock className="text-primary" size={18} />
            <p className="font-label text-sm tracking-widest uppercase font-bold text-primary">
              Active Booking Window
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface p-4 rounded-lg flex-1 text-center">
              <span className="block font-headline text-3xl font-bold">04</span>
              <span className="block text-[10px] uppercase tracking-tighter opacity-60 mt-1">
                Slots Left Today
              </span>
            </div>
            <div className="bg-surface p-4 rounded-lg flex-1 text-center">
              <span className="block font-headline text-3xl font-bold">12:45</span>
              <span className="block text-[10px] uppercase tracking-tighter opacity-60 mt-1">
                Next Refresh
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-8">
          {/* Paystack Logo Placeholder */}
          <div className="h-8 px-4 bg-surface-container rounded-lg flex items-center justify-center">
            <span className="text-[10px] font-label tracking-widest uppercase text-on-surface-variant/40">
              paystack-logo.png
            </span>
          </div>

          <div className="h-8 w-px bg-outline-variant/30" />

          <div className="flex items-center gap-2">
            <BadgeCheck className="text-green-600" size={20} />
            <span className="font-label text-xs tracking-widest uppercase">
              Certified Professional
            </span>
          </div>
        </div>
      </div>

      {/* Right — Studio Image with Quote Overlay */}
      <div className="relative group">
        {/* Decorative border frame */}
        <div className="absolute -inset-4 border border-primary/20 rounded-xl transition-all duration-300 group-hover:-inset-2" />

        <div className="relative aspect-square bg-surface-container overflow-hidden rounded-lg">
          {/* Image Placeholder */}
          <div className="absolute inset-0 bg-surface-container-high flex flex-col items-center justify-center gap-2">
            <span className="text-2xl opacity-30">📷</span>
            <span className="text-on-surface-variant/40 text-xs font-label tracking-widest uppercase">
              studio.jpg
            </span>
          </div>

          {/* Testimonial Quote Overlay */}
          <div className="absolute bottom-8 left-8 right-8 p-6 bg-surface/90 backdrop-blur-md rounded-lg">
            <p className="font-headline italic text-lg mb-3 leading-snug">
              "The only place in Abeokuta that understands the depth of our skin
              tones."
            </p>
            <p className="font-label text-xs tracking-widest uppercase text-primary">
              — Tiwa, Editorial Director
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
