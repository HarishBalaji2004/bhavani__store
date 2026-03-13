import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import PageHero from "@/components/ui/PageHero";
import FAQContent from "@/components/ui/FAQContent";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/StructuredData";
import { FAQS } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Answers to common questions about Bhavani Store's agricultural commodities, pricing, quality, and delivery.",
  alternates: { canonical: "https://bhavanistore.in/faq" },
};

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }]} />
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          kicker="Got Questions?"
          title="Frequently Asked Questions"
          description="Everything you need to know about trading with Bhavani Store — from pricing to quality to delivery."
        />
        <FAQContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
