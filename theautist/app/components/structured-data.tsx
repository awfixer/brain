export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "theautist",
    url: "https://theautist.me",
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "AWFixer and Friends",
    },
    sameAs: ["https://github.com/theautist", "https://inv.wtf/deadinside"],
    description:
      "Developer specializing in software engineering, OS development, and innovative tech solutions.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://theautist.me",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
