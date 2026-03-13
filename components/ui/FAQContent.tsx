"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { FAQS, BUSINESS } from "@/lib/data";
import { formatWhatsAppUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Motion";

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const waUrl = formatWhatsAppUrl(
    "Hello! I have a question about your agricultural commodities.",
    BUSINESS.whatsappNumber
  );

  return (
    <section className="py-16" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 id="faq-heading" className="sr-only">FAQ Questions</h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              aria-label="Search FAQ questions"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="FAQ categories">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-earth text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-gold/40"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* FAQ list */}
        {filtered.length > 0 ? (
          <FAQAccordion faqs={filtered} />
        ) : (
          <Reveal>
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-2">No questions found</p>
              <p className="text-sm">Try a different search term or category</p>
            </div>
          </Reveal>
        )}

        {/* Contact CTA */}
        <Reveal className="mt-12">
          <div className="bg-card rounded-3xl border border-border p-8 text-center shadow-soft">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Our team typically responds within 2 hours during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href={waUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c45a] text-white font-semibold px-7 py-3 rounded-2xl text-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </motion.a>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-border bg-card hover:bg-muted/50 text-foreground font-semibold px-7 py-3 rounded-2xl text-sm transition-colors"
                >
                  Contact Form
                </Link>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
