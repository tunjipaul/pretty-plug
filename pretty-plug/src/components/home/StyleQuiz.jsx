import { Sparkles } from "lucide-react";

const vibes = [
  { label: "Soft & Ethereal" },
  { label: "Bold & Sovereign" },
  { label: "Quiet Luxury" },
];

export default function StyleQuiz() {
  return (
    <section className="bg-surface-container-low py-32 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Sparkles className="text-primary mx-auto mb-6" size={36} />

        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">
          Not sure what suits you?
        </h2>

        <p className="font-body text-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Take our 2-minute "Melanin Intuition" quiz to discover the perfect
          lash length and nail shape for your unique profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vibes.map((vibe) => (
            <button
              key={vibe.label}
              className="p-8 bg-surface-container-lowest hover:bg-primary-container transition-colors rounded-xl border border-outline-variant/15 text-left group cursor-pointer"
            >
              <span className="block font-label text-xs tracking-widest uppercase mb-4 text-primary">
                Vibe
              </span>
              <p className="font-headline text-xl italic group-hover:text-on-primary-container">
                {vibe.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
