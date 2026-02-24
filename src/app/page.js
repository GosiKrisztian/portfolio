"use client";

import { useState } from "react";
import { useEffect } from 'react';
import containerStyles from "./styles/variables.module.css";
import headerStyles from "./styles/header.module.css";
import mainStyles from "./styles/main.module.css";
import introStyles from "./styles/intro.module.css";
import worksStyles from "./styles/works.module.css";
import partnersStyles from "./styles/partners.module.css";
import contactStyles from "./styles/contact.module.css";
import formStyles from "./styles/form.module.css";
import faqStyles from "./styles/faq.module.css";
import footerStyles from "./styles/footer.module.css";
import Image from "next/image";
import { workItems, partnerItems, faqItems } from "./data";


export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    if (selectedPartner || selectedWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPartner, selectedWork]);

  

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Kötelező kitölteni";
    }
    if (!formData.email.trim()) {
      errors.email = "Kötelező kitölteni";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Kérem adjon meg egy érvényes e-mail címet";
    }
    if (!formData.message.trim()) {
      errors.message = "Kötelező kitölteni";
    }
    return errors;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus("error");
        console.error('Error:', data.error);
        setTimeout(() => setSubmitStatus(null), 3000);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Amikor megnyitod a modált, nullázd le az indexet:
const openModal = (work) => {
  setCurrentImageIndex(0);
  setSelectedWork(work);
};

// Váltó funkciók
const nextImage = (e) => {
  e.stopPropagation(); // Hogy ne záródjon be a modal
  setCurrentImageIndex((prev) => (prev + 1) % selectedWork.images.length);
};

const prevImage = (e) => {
  e.stopPropagation();
  setCurrentImageIndex((prev) => (prev - 1 + selectedWork.images.length) % selectedWork.images.length);
}

// Ezt a függvényt a return elé tedd
const handleOpenModal = (work) => {
  setCurrentImageIndex(0); // Visszaállítjuk az első képre
  setSelectedWork(work);   // Beállítjuk a kiválasztott munkát
};

  return (
    <div className={containerStyles.container}> 
      {/* Header Navigation */}
      <header className={headerStyles.header}>
        <div className={headerStyles.logoContainer}>
          <Image
            src="/pics/logo_hatter_nelkul.png" 
            alt="PixelPitchPartners Logo" 
            className={headerStyles.logoImage}
            width={75} 
            height={75}
            priority
            style={{ height: 'auto' }}
          />
        <div className={headerStyles.logo}>PixelPitchPartners</div> </div>
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
          <a href="#footer" className={headerStyles.navLink}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          
          {/* Message Section */}
          <form className={formStyles.contactForm} onSubmit={handleSubmit}>
            <h1 className={formStyles.formTitle}>Küldjön nekünk üzenetet!</h1>
            <div className={formStyles.formGroup}>
              <label htmlFor="name" className={formStyles.formLabel}>Név *</label>
              <input
                type="text"
                id="name"
                name="name"
                maxLength="50"
                value={formData.name}
                onChange={handleInputChange}
                className={formStyles.formInput}
                placeholder="Név"
              />
              {formErrors.name && <span className={formStyles.errorMessage}>{formErrors.name}</span>}
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="email" className={formStyles.formLabel}>Email cím *</label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength="50"
                value={formData.email}
                onChange={handleInputChange}
                className={formStyles.formInput}
                placeholder="minta@email.com"
              />
              {formErrors.email && <span className={formStyles.errorMessage}>{formErrors.email}</span>}
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="message" className={formStyles.formLabel}>Üzenet *</label>
              <textarea
                id="message"
                name="message"
                maxLength="2000"
                value={formData.message}
                onChange={handleInputChange}
                className={formStyles.formTextarea}
                placeholder="Az Ön üzenete . . ."
              />
              {formErrors.message && <span className={formStyles.errorMessage}>{formErrors.message}</span>}
            </div>

            <button type="submit" className={formStyles.submitBtn}>
              Küldés
            </button>

            {submitStatus === "success" && (
              <div style={{ color: "#4ade80", fontSize: "14px", textAlign: "center", marginTop: "10px" }}>
                ✓ Üzenet sikeresen elküldve!
              </div>
            )}
            {submitStatus === "error" && (
              <div style={{ color: "#ff6b6b", fontSize: "14px", textAlign: "center", marginTop: "10px" }}>
                ✗ Hiba az üzenet küldése során. Kérem próbálja később.
              </div>
            )}
          </form>
        </section>

        {/* Portfolio Works Section */}
        <section className={worksStyles.worksSection} id="works">
          <h2 className={worksStyles.sectionTitle}>Munkáink</h2>
          <div className={worksStyles.galleryContainer}>
            {workItems.map((work) => (
              <div 
                key={work.id} 
                className={worksStyles.imageCard}
                onClick={() => handleOpenModal(work)}
                style={{ cursor: 'pointer' }}
              >
                <Image 
                  src={work.images[0]} 
                  alt={work.title} 
                  width={400} 
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                />
                <h3>{work.title}</h3>
                <p>{work.shortDesc}</p>
              </div>
            ))}
          </div>

          {/* Work Modal */}
          {selectedWork && (
            <div className={worksStyles.modalOverlay} onClick={() => setSelectedWork(null)}>
              <div className={worksStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={worksStyles.closeButton} onClick={() => setSelectedWork(null)}>
                  ✕
                </button>

                <div className={worksStyles.imageSliderContainer}>
                  {selectedWork?.images?.length > 1 && ( 
                    <>
                      <button className={worksStyles.navButtonLeft} onClick={prevImage}>❮</button>
                      <button className={worksStyles.navButtonRight} onClick={nextImage}>❯</button>
                    </>
                  )}

                  <Image 
                    src={selectedWork.images[currentImageIndex]} 
                    alt={selectedWork.title} 
                    className={worksStyles.modalImage} 
                    width={800} 
                    height={450}
                    style={{ height: 'auto' }}
                  />
                </div>

                <h2>{selectedWork.title}</h2>
                <p>{selectedWork.detailedDesc}</p>
              </div>
            </div>
          )}
        </section>

        {/* Partners Section */}
        <section className={partnersStyles.partnersSection} id="partners">
          <h2 className={partnersStyles.sectionTitle}>Partnerek</h2>
          <div className={partnersStyles.partnersContainer}>
            {partnerItems.map((partner) => (
              <div 
                key={partner.id}
                className={partnersStyles.partnerCard}
                onClick={() => setSelectedPartner(partner)}
                style={{ cursor: 'pointer' }}
              >
                <div className={partnersStyles.logoWrapper}>
                  <Image 
                    src={partner.logo ? `/${partner.logo}` : "/pics/placeholder.png"} 
                    alt={partner.name} 
                    className={partnersStyles.partnerLogo} 
                    width={220} 
                    height={140}
                    style={{ height: 'auto' }}
                  />
                </div>
                <h3 className={partnersStyles.partnerName}>{partner.name}</h3>
                <p>{partner.shortDesc}</p>
              </div>
            ))}
          </div>

          {/* Partner Modal */}
          {selectedPartner && (
            <div className={partnersStyles.modalOverlay} onClick={() => setSelectedPartner(null)}>
              <div className={partnersStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={partnersStyles.closeButton} onClick={() => setSelectedPartner(null)}>
                  ✕
                </button>
                {/* A LOGÓ MEGVALÓSÍTÁSA A MODÁLBAN */}
                {selectedPartner.logo && (
                  <div className={partnersStyles.modalLogoContainer}>
                    <Image 
                      src={`/${selectedPartner.logo}`} 
                      alt={selectedPartner.name} 
                      className={partnersStyles.modalLogoImage} 
                      width={300} 
                      height={150}
                      style={{ height: 'auto' }}
                    />
                  </div>
                )}
                <h2>{selectedPartner.name}</h2>
                <p>{selectedPartner.shortDesc}</p>
                <p>{selectedPartner.detailedDesc}</p>
              </div>
            </div>
          )}
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
      <footer className={footerStyles.footer} id="footer">
        <div className={footerStyles.footerContent}>
          {/* Left Column - Logo and Copyright */}
          <div className={footerStyles.footerLeft}>
            <div className={footerStyles.logoWrapper}>
              <Image 
                src="/pics/logo_hatter_nelkul.png" 
                alt="PixelPitchPartners Logo" 
                className={footerStyles.footerLogoImage} 
                width={100}
                height={100}
                style={{ height: 'auto' }}
              />
              <h3 className={footerStyles.footerLogo}>PixelPitchPartners</h3>
            </div>
            <p className={footerStyles.footerCopyright}>&copy; 2026 PixelPitchPartners. Minden jog fenntartva.</p>
          </div>

          {/* Middle Column - Contact Info */}
          <div className={footerStyles.footerMiddle}>
            <h4 className={footerStyles.columnTitle}>Megoldásaink</h4>
            <ul className={footerStyles.footerList}>
              <li>Egyedi weboldal fejlesztés</li>
              <li>Egyedi webshop fejlesztés</li>
              <li>Keresőoptimalizálás (SEO)</li>
            </ul>
          </div>

          {/* Right Column - Social Links */}
          <div className={footerStyles.footerRight}>
            <h4 className={footerStyles.columnTitle}>Kapcsolat</h4>
          <div className={footerStyles.contactInfo}>
            <div className={footerStyles.infoItem}>
            <span className={footerStyles.infoLabel}>Telefonszám</span>
            <span className={footerStyles.infoValue}>+36 30 316 3943</span>
            <span className={footerStyles.infoValue}>+36 30 123 4567</span>
          </div>
          <div className={footerStyles.infoItem}>
            <span className={footerStyles.infoLabel}>Email cím</span>
            <span className={footerStyles.infoValue}>hello@pixelpitchpartners.com</span>
            <span className={footerStyles.infoValue}>info@pixelpitchpartners.com</span>
          </div>
          </div>
            <div className={footerStyles.socialLinks}>
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                className={footerStyles.socialLink} 
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                className={footerStyles.socialLink} 
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.3 2C5.3 4 4 5.3 4 7.5v9c0 2.2 1.3 3.5 3.5 3.5h9c2.2 0 3.5-1.3 3.5-3.5v-9c0-2.2-1.3-3.5-3.5-3.5h-9m11.2 1.5a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5m-5.8 1.5c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6m0 2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                className={footerStyles.socialLink} 
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
