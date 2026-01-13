"use client";

import { useState } from "react";
import containerStyles from "./styles/variables.module.css";
import headerStyles from "./styles/header.module.css";
import mainStyles from "./styles/main.module.css";
import introStyles from "./styles/intro.module.css";
import worksStyles from "./styles/works.module.css";
import partnersStyles from "./styles/partners.module.css";
import contactStyles from "./styles/contact.module.css";
import faqStyles from "./styles/faq.module.css";
import footerStyles from "./styles/footer.module.css";

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: "Milyen szolgáltatásokat nyújtanak?",
      answer: "A PixelPitchPartners teljes körű webfejlesztési, mobilalkalmazás-fejlesztési és digitális marketing szolgáltatásokat nyújt a vállalkozások számára."
    },
    {
      question: "Mennyi ideig tart egy projekt?",
      answer: "A projektidőtartam az ügyfél igényeitől függ. Szorosan együttműködünk az ügyfelekkel, hogy meghatározzuk az optimális ütemezést és határidőket."
    },
    {
      question: "Hogyan működik az ár megállapítás?",
      answer: "Az árazás az adott projekt összetettségétől és terjedelmétől függ. Mindig egyedi ajánlatot készítünk az ügyfél igényei alapján."
    },
    {
      question: "Van-e korlátlan támogatás után a projekt befejezése után?",
      answer: "Igen, a projekt után tartós támogatást és karbantartást nyújtunk az ügyfeleknek. A részleteket az ügyfélszolgálatunkkal meg lehet beszélni."
    }
  ];

  return (
    <div className={containerStyles.container}>
      {/* Header Navigation */}
      <header className={headerStyles.header}>
        <div className={headerStyles.logo}>PixelPitchPartners</div>
        <nav className={headerStyles.nav}>
          <a href="#about" className={headerStyles.navLink}>
            Rólunk
          </a>
          <a href="#works" className={headerStyles.navLink}>
            Munkáink
          </a>
          <a href="#partners" className={headerStyles.navLink}>
            Partnerek
          </a>
          <a href="#contact" className={headerStyles.navLink}>
            Kapcsolat
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className={mainStyles.main}>
        {/* Introduction Section */}
        <section className={introStyles.introSection} id="about">
          <div className={introStyles.introContent}>
            <h1 className={introStyles.title}>Üdvözöljük a Portfólióban</h1>
            <p className={introStyles.introText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </section>

        {/* Portfolio Works Section */}
        <section className={worksStyles.worksSection} id="works">
          <h2 className={worksStyles.sectionTitle}>Munkáink</h2>
          <div className={worksStyles.galleryContainer}>
            <div className={worksStyles.imageCard}>
              <div className={worksStyles.imagePlaceholder}>
                <span>Kép 1</span>
              </div>
              <h3>Projekt 1</h3>
              <p>Kitűnő dizájn és funkcionalitás</p>
            </div>
            <div className={worksStyles.imageCard}>
              <div className={worksStyles.imagePlaceholder}>
                <span>Kép 2</span>
              </div>
              <h3>Projekt 2</h3>
              <p>Innovatív megoldások</p>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className={partnersStyles.partnersSection} id="partners">
          <h2 className={partnersStyles.sectionTitle}>Partnerek</h2>
          <div className={partnersStyles.partnersContainer}>
            <div className={partnersStyles.partnerCard}>
              <div className={partnersStyles.partnerLogo}>Partner 1</div>
              <p>Megbízható partner az innováció terén</p>
            </div>
            <div className={partnersStyles.partnerCard}>
              <div className={partnersStyles.partnerLogo}>Partner 2</div>
              <p>Szakterületünk vezetője</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={contactStyles.contactSection} id="contact">
          <h2 className={contactStyles.sectionTitle}>Kapcsolat</h2>
          <p className={contactStyles.contactText}>
            Érdekelnek a projektjeink? Vegyél fel velünk kapcsolatot!
          </p>
        </section>

        {/* FAQ Section */}
        <section className={faqStyles.faqSection} id="faq">
          <h2 className={faqStyles.sectionTitle}>GYIK</h2>
          <div className={faqStyles.faqContainer}>
            {faqItems.map((item, index) => (
              <div key={index} className={faqStyles.faqItem}>
                <button
                  className={faqStyles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <span className={`${faqStyles.faqIcon} ${expandedFAQ === index ? faqStyles.faqIconOpen : ""}`}>
                    ▼
                  </span>
                </button>
                {expandedFAQ === index && (
                  <div className={faqStyles.faqAnswer}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={footerStyles.footer}>
        <div className={footerStyles.footerContent}>
          <p>&copy; 2026 PixelPitchPartners. Minden jog fenntartva.</p>
          <div className={footerStyles.footerLinks}>
            <a href="#about">Rólunk</a>
            <a href="#works">Munkáink</a>
            <a href="#partners">Partnerek</a>
            <a href="#contact">Kapcsolat</a>
          </div>
          <div className={footerStyles.socialLinks}>
            <a href="#facebook" className={footerStyles.socialLink} title="Facebook">
              f
            </a>
            <a href="#instagram" className={footerStyles.socialLink} title="Instagram">
              📷
            </a>
            <a href="#linkedin" className={footerStyles.socialLink} title="LinkedIn">
              in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
