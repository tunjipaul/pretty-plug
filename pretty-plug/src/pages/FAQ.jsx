import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Gavel,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";

const categories = [
  {
    id: "booking",
    label: "Booking",
    icon: CalendarDays,
    questions: [
      {
        question: "How do I schedule a home service?",
        answer:
          "Home services can be booked through our booking flow by selecting the mobile service option. Availability depends on your location and appointment type.",
      },
      {
        question: "Can I book for multiple people at once?",
        answer:
          "Yes. For groups of three or more, contact the concierge team directly so we can coordinate timing, services, and setup properly.",
      },
      {
        question: "How far ahead should I book?",
        answer:
          "We recommend booking at least 48 hours ahead for standard appointments and one week ahead for bridal, group, or detailed nail art sessions.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing and Payments",
    icon: CreditCard,
    questions: [
      {
        question: "Do prices include nail art?",
        answer:
          "Base service prices include standard prep and polish. Detailed nail art, chrome, stones, 3D accents, and advanced designs are priced as add-ons.",
      },
      {
        question: "Is a deposit required?",
        answer:
          "A deposit may be required to secure premium appointment slots, group bookings, or services with extended timing.",
      },
      {
        question: "Can I pay online?",
        answer:
          "Yes. Online payments are supported where available in the booking flow. In-studio payment options may also be available.",
      },
    ],
  },
  {
    id: "aftercare",
    label: "Aftercare",
    icon: Sparkles,
    questions: [
      {
        question: "How do I care for my nails after service?",
        answer:
          "Apply cuticle oil daily, avoid using your nails as tools, and wear gloves for heavy cleaning or prolonged water exposure.",
      },
      {
        question: "When should I refill my lashes?",
        answer:
          "Most lash sets need refills every two to three weeks, depending on your natural lash cycle and aftercare routine.",
      },
    ],
  },
  {
    id: "policies",
    label: "Studio Policies",
    icon: Gavel,
    questions: [
      {
        question: "What is the cancellation policy?",
        answer:
          "Please cancel or reschedule at least 24 hours before your appointment so the slot can be offered to another client.",
      },
      {
        question: "What happens if I am late?",
        answer:
          "There is a 15-minute grace period. Late arrivals may require service adjustments to protect the next client's appointment time.",
      },
    ],
  },
];

function FAQAccordion({ item, defaultOpen = false }) {
  return (
    <details
      className="group overflow-hidden border border-outline-variant/30 bg-white"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 transition-colors hover:bg-surface-container-low">
        <h3 className="font-headline text-xl font-medium text-on-surface md:text-2xl">
          {item.question}
        </h3>
        <ChevronDown className="shrink-0 text-primary-container transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-outline-variant/10 px-6 pb-6 pt-5 font-body text-base leading-7 text-on-surface-variant">
        {item.answer}
      </div>
    </details>
  );
}

export default function FAQ() {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter((item) =>
          `${item.question} ${item.answer}`
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [query]);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <RevealSection>
          <section className="relative overflow-hidden bg-surface-container-low px-5 pb-16 pt-24 md:px-20 md:pt-32">
            <div className="relative z-10 mx-auto max-w-[1280px] text-center">
              <span className="mb-4 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                Support Center
              </span>
              <h1 className="mx-auto mb-10 max-w-2xl font-display text-[40px] font-semibold leading-tight text-on-surface md:text-[64px]">
                How can we help you today?
              </h1>

              <div className="mx-auto max-w-3xl">
                <label htmlFor="faq-search" className="sr-only">
                  Search frequently asked questions
                </label>
                <div className="flex items-center border border-outline-variant/20 bg-white px-5 py-4 shadow-xl">
                  <Search className="mr-4 text-outline" size={22} />
                  <input
                    id="faq-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full bg-transparent font-body text-base outline-none placeholder:text-outline/60 md:text-lg"
                    placeholder="Search for pricing, aftercare, or policies..."
                    type="search"
                  />
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2 font-body text-sm">
                  <span className="text-on-surface-variant">Popular:</span>
                  <a className="font-medium text-primary-container hover:underline" href="#aftercare">
                    Aftercare tips
                  </a>
                  <span className="text-outline-variant">/</span>
                  <a className="font-medium text-primary-container hover:underline" href="#pricing">
                    Gel pricing
                  </a>
                  <span className="text-outline-variant">/</span>
                  <a className="font-medium text-primary-container hover:underline" href="#policies">
                    Cancellation policy
                  </a>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <aside className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-32 space-y-4">
                  <h2 className="mb-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                    Categories
                  </h2>
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <a
                        key={category.id}
                        href={`#${category.id}`}
                        className={`flex items-center gap-3 p-4 transition-colors ${
                          index === 0
                            ? "bg-primary-container text-on-primary shadow-sm"
                            : "text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-body font-bold">
                          {category.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </aside>

              <div className="space-y-20 lg:col-span-9">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} id={category.id}>
                        <h2 className="mb-8 flex items-center gap-4 font-headline text-3xl font-medium text-on-surface">
                          <span className="bg-primary/10 p-3 text-primary-container">
                            <Icon size={22} />
                          </span>
                          {category.label}
                        </h2>
                        <div className="space-y-4">
                          {category.questions.map((item, index) => (
                            <FAQAccordion
                              key={item.question}
                              item={item}
                              defaultOpen={index === 0}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="border border-outline-variant/30 bg-white p-10 text-center">
                    <h2 className="mb-3 font-headline text-3xl font-medium">
                      No matching questions
                    </h2>
                    <p className="font-body text-on-surface-variant">
                      Try a different keyword or message the concierge team.
                    </p>
                  </div>
                )}

                <div id="policies-summary" className="grid grid-cols-1 overflow-hidden bg-inverse-surface text-inverse-on-surface md:grid-cols-2">
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <h2 className="mb-6 font-headline text-4xl font-medium">
                      Studio Policies
                    </h2>
                    <p className="mb-8 font-body text-base leading-7 text-surface-variant">
                      To maintain our standard of excellence and ensure every
                      guest receives full attention, appointments follow a clear
                      cancellation and late-arrival policy.
                    </p>
                    <ul className="space-y-4 font-body text-base">
                      {[
                        "15-minute grace period for appointments.",
                        "24-hour notice for cancellations.",
                        "No-shows may be charged full price.",
                      ].map((policy) => (
                        <li key={policy} className="flex items-start gap-3">
                          <CheckCircle
                            className="mt-0.5 shrink-0 text-primary-fixed"
                            size={20}
                          />
                          <span>{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative min-h-[340px]">
                    <img
                      src="/images/studio.jpg"
                      alt="Beauty Plug studio interior"
                      className="absolute inset-0 h-full w-full object-cover grayscale opacity-55 contrast-125"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="bg-surface-container-high px-5 py-24 md:px-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-display text-4xl font-semibold text-on-surface md:text-5xl">
                Still have questions?
              </h2>
              <p className="mb-10 font-body text-base leading-7 text-on-surface-variant md:text-lg">
                Our concierge team is available from 9 AM to 7 PM WAT to assist
                with specific requests or concerns.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  className="inline-flex h-14 items-center justify-center gap-3 bg-[#25D366] px-10 font-label text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-1 hover:shadow-xl"
                  href="https://wa.me/2340000000"
                >
                  <MessageCircle size={18} />
                  Message on WhatsApp
                </a>
                <a
                  className="inline-flex h-14 items-center justify-center gap-3 border border-outline px-10 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface transition-colors hover:bg-surface-container-lowest"
                  href="tel:+23412345678"
                >
                  <Phone size={18} />
                  Call Studio
                </a>
              </div>
            </div>
          </section>
        </RevealSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
