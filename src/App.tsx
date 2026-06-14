import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './index.css'

// Import billeder
import annaTora from './assets/Anna Tora.png'
import cykelPlakat from './assets/Cykel plakat.jpg'
import lisePlakat from './assets/Lise plakat.jpg'
import skeletPlakat from './assets/Skelet.jpg'
import toPersonerPlakat from './assets/To personer plakat.jpg'

// Import videoer
import malevideo from './assets/Malevideo.mp4'
import containerVideo from './assets/ContainerKUNST video.mp4'
import peerVideo from './assets/Peer parner video.mp4'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryImages = [
    { url: cykelPlakat, title: "Cykel plakat" },
    { url: lisePlakat, title: "Lise plakat" },
    { url: skeletPlakat, title: "Skelet" },
    { url: toPersonerPlakat, title: "To personer" }
  ]

  const processVideos = [
    { url: malevideo, title: "Kreativ proces" },
    { url: containerVideo, title: "ContainerKUNST" },
    { url: peerVideo, title: "Peer-Partnerskabet" }
  ]

  return (
    <div className="app">
      <div className="sticky-banner">
        MIDLERTIDIG SIDE – DEN FULDE OPLEVELSE ER PÅ VEJ! 🎨
      </div>

      <section className="hero">
        <div className="section-content">
          <div style={{ marginBottom: '2rem' }}>
            <img 
              src={annaTora} 
              alt="Tóra Tegner" 
              className="profile-img"
            />
          </div>
          <h1>Tóra Tegner</h1>
          <p className="hero-sub">Håndtegnede fortællinger, der danser på papiret</p>
          <p className="hero-text">
            Glem alt om kedelige lige linjer. Her får du personlige krusedulle-vibe, der bringer liv og skæve smil ind i dit hjem.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <p className="social-label">Følg med her</p>
            <a href="https://www.instagram.com/tora_tegner/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-content">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Udvalgte Værker</h2>
          <div className="swiper-container-relative" style={{ position: 'relative' }}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="mySwiper"
            >
              {galleryImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="gallery-item" onClick={() => setSelectedImage(img.url)} style={{ cursor: 'pointer' }}>
                    <img src={img.url} alt={img.title} loading="lazy" />
                    <p className="gallery-item-title">{img.title}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </section>

      <section className="videos-section">
        <div className="section-content">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Bag Om Stregen</h2>
          <div className="video-grid">
            {processVideos.map((video, index) => (
              <div key={index} className="gallery-item" style={{ padding: '1rem' }}>
                <video 
                  src={`${video.url}#t=0.001`} 
                  controls 
                  style={{ width: '100%', borderRadius: 'inherit', display: 'block', backgroundColor: '#000' }}
                  muted
                  loop
                  preload="metadata"
                />
                <p className="gallery-item-title">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="section-content" style={{ textAlign: 'center' }}>
          <h2>Giv dine vægge en personlig krølle</h2>
          <p className="info-text">
            En Tóra Tegner plakat er ikke bare en tegning – det er en legende fortolkning af alt det, der betyder noget for dig. 
            Med min intuitive krusedulle-streg forvandler jeg minder, følelser og drømme til unikke værker, der aldrig bliver kedelige at se på. 
            Hver streg er særbestilt og tegnet med kærlighed til det uperfekte og det helt unikke.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-content">
          <div className="contact-box">
            <h2>Skal vi skabe magi sammen?</h2>
            <p>Hver bestilling starter med en god snak om dine ønsker.</p>
            <p style={{ margin: '1.5rem 0' }}>
              Send en krusedulle-hilsen til: <br />
              <a href="mailto:hej@torategner.dk">hej@torategner.dk</a>
            </p>
            <p>Hop ind i mit kreative univers på Instagram: <strong>@tora_tegner</strong></p>
          </div>
        </div>
      </section>

      <footer className="footer-custom">
        &copy; {new Date().getFullYear()} Tóra Tegner. Alle rettigheder forbeholdes.
      </footer>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage} alt="Fuld størrelse" />
            <button className="close-lightbox">&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
