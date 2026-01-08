import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Portfolio</div>
        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink}>
            Rólunk
          </a>
          <a href="#works" className={styles.navLink}>
            Munkáink
          </a>
          <a href="#contact" className={styles.navLink}>
            Kapcsolat
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Introduction Section */}
        <section className={styles.introSection} id="about">
          <div className={styles.introContent}>
            <h1 className={styles.title}>Üdvözöljük a Portfólióban</h1>
            <p className={styles.introText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </section>

        {/* Portfolio Works Section */}
        <section className={styles.worksSection} id="works">
          <h2 className={styles.sectionTitle}>Munkáink</h2>
          <div className={styles.galleryContainer}>
            <div className={styles.imageCard}>
              <div className={styles.imagePlaceholder}>
                <span>Kép 1</span>
              </div>
              <h3>Projekt 1</h3>
              <p>Kitűnő dizájn és funkcionalitás</p>
            </div>
            <div className={styles.imageCard}>
              <div className={styles.imagePlaceholder}>
                <span>Kép 2</span>
              </div>
              <h3>Projekt 2</h3>
              <p>Innovatív megoldások</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection} id="contact">
          <h2 className={styles.sectionTitle}>Kapcsolat</h2>
          <p className={styles.contactText}>
            Érdekelnek a projektjeink? Vegyél fel velünk kapcsolatot!
          </p>
        </section>
      </main>
    </div>
  );
}
