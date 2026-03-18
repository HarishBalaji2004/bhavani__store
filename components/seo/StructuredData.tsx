import { BUSINESS, PRODUCTS } from "@/lib/data";

const SITE_URL = "https://bhavani-store.vercel.app";

/**
 * Injects JSON-LD structured data for rich search results
 * Place on any page that needs structured data
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: BUSINESS.name,
    description:
      "Premier agricultural commodities trading house in Tamil Nadu, established in 1974. Specializing in red chillies, raw cotton, paddy, neem seeds, tamarind and millets.",
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: BUSINESS.established,
    vatID: BUSINESS.gst,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS.address.street}, ${BUSINESS.address.area}`,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.5839,
      longitude: 78.3456,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      `https://wa.me/${BUSINESS.whatsappNumber}`,
      BUSINESS.mapsUrl,
    ],
    areaServed: {
      "@type": "State",
      name: "Tamil Nadu",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Agricultural Commodities",
      itemListElement: [
        "Red Dry Chillies",
        "Guntur Chillies",
        "Raw Cotton",
        "Paddy Rice",
        "Neem Seeds",
        "Tamarind",
        "Tamarind Seeds",
        "Millets",
      ].map((product, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Product",
          name: product,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Products page schema — uses ItemList so Google does NOT require
 * offers/price on each product (fixes the 8 invalid items error)
 */
export function ProductsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agricultural Commodities — Bhavani Store",
    description:
      "Premium agricultural commodities traded by Bhavani Store, Paramakudi, Tamil Nadu",
    url: `${SITE_URL}/products`,
    itemListElement: PRODUCTS.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      description: product.description,
      url: `${SITE_URL}/products`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ page structured data
 */
export function FAQSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb structured data
 */
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
