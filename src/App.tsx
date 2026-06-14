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
    { url: peerVideo, title: "Peer parner" }
  ]

  return (
    <div className="app">
      <div style={{ backgroundColor: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '0.75rem', fontSize: '1rem', fontWeight: '900', letterSpacing: '0.05em' }}>
        MIDLERTIDIG SIDE – DEN FULDE OPLEVELSE ER PÅ VEJ! 🎨
      </div>
      <section className="hero">
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src={annaTora} 
            alt="Tóra Tegner" 
            style={{ 
              width: '250px', 
              height: '250px', 
              objectFit: 'cover', 
              borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
              border: '4px solid var(--text-color)',
              boxShadow: '15px 15px 0px var(--secondary-color)'
            }} 
          />
        </div>
        <h1>Tóra Tegner</h1>
        <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary-color)', maxWidth: '800px', margin: '0 auto' }}>Håndtegnede fortællinger, der danser på papiret</p>
        <p style={{ marginTop: '2.5rem', fontSize: '1.2rem', maxWidth: '650px', margin: '2.5rem auto', color: 'var(--text-color)' }}>
          Glem alt om kedelige lige linjer. Her får du personlige krusedulle-vibe, der bringer liv og skæve smil ind i dit hjem.
        </p>
        <div style={{ marginTop: '3rem' }}>
          <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '1rem' }}>Følg med her</p>
          <a href="https://www.instagram.com/tora_tegner/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.3s' }} className="social-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </section>

      <section className="gallery">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-color)' }}>Udvalgte Værker</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mySwiper"
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="gallery-item" onClick={() => setSelectedImage(img.url)} style={{ cursor: 'pointer' }}>
                <img src={img.url} alt={img.title} />
                <p style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--accent-color)' }}>{img.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="videos" style={{ padding: '8rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-color)' }}>Bag Om Stregen</h2>
        <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
          {processVideos.map((video, index) => (
            <div key={index} className="gallery-item" style={{ padding: '1rem' }}>
              <video 
                src={video.url} 
                controls 
                style={{ width: '100%', borderRadius: 'inherit', display: 'block' }}
                muted
                loop
              />
              <p style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--accent-color)' }}>{video.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info">
        <h2>Giv dine vægge en personlig krølle</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          En Tóra Tegner plakat er ikke bare en tegning – det er en legende fortolkning af alt det, der betyder noget for dig. 
          Med min intuitive krusedulle-streg forvandler jeg minder, følelser og drømme til unikke værker, der aldrig bliver kedelige at se på. 
          Hver streg er særbestilt og tegnet med kærlighed til det uperfekte og det helt unikke.
        </p>
      </section>

      <section className="contact" style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}>
        <h2 style={{ color: 'white' }}>Skal vi skabe magi sammen?</h2>
        <p>Hver bestilling starter med en god snak om dine ønsker.</p>
        <p style={{ margin: '1.5rem 0' }}>
          Send en krusedulle-hilsen til: <br />
          <a href="mailto:hej@torategner.dk" style={{ color: 'white', borderBottomColor: 'white' }}>hej@torategner.dk</a>
        </p>
        <p>Hop ind i mit kreative univers på Instagram: <strong>@tora_tegner</strong></p>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', fontSize: '0.8rem', opacity: 0.7 }}>
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
