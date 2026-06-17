import { useState, useEffect } from 'react'
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
import moesgaardImg from './assets/Moesgaard.jpg'
import moesgaardBookmarks from './assets/Moesgaard bogmærker.jpg'

// Import videoer
import containerProces from './assets/containerKUNST roces.mp4'
import containerOpening from './assets/container_opening.mp4'
import urkVideo from './assets/URK.mp4'
import peerPartnerskabetVideo from './assets/Peerpartnerskabet.mp4'
import muskelsvindsfondenVideo from './assets/Muskelsvindsfonden.mp4'
import tegneproces1 from './assets/Tegneproces 1.mp4'
import tegneproces2 from './assets/Tegneproces 2.mp4'
import tegneproces3 from './assets/Tegneproces 3.mp4'
import printProces from './assets/Print proces.mp4'

// Import ikoner
import instagramIkon from './assets/instagram_ikon.png'
import mailIkon from './assets/mail_ikon.png'
import linkedinIkon from './assets/linkedin_ikon.png'
import phoneIkon from './assets/phone_ikon.png'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Luk lightbox med Escape-tasten
  useEffect(() => {
    if (!selectedImage) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedImage])

  // Gør et klikbart medie til en rigtig knap (mus + tastatur)
  const openProps = (url: string, label: string) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `Åbn ${label} i stor visning`,
    style: { cursor: 'pointer' },
    onClick: () => setSelectedImage(url),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setSelectedImage(url)
      }
    },
  })

  const galleryImages = [
    { url: cykelPlakat, title: "Cykel plakat" },
    { url: lisePlakat, title: "Lise plakat" },
    { url: skeletPlakat, title: "Skelet" },
    { url: toPersonerPlakat, title: "To personer" }
  ]

  const processVideos = [
    { url: tegneproces1, title: "Tegneproces I" },
    { url: tegneproces2, title: "Tegneproces II" },
    { url: tegneproces3, title: "Tegneproces III" },
    { url: printProces, title: "Fra skærm til print" }
  ]

  return (
    <div className="app">
      <div className="sticky-banner">
        Midlertidig side – jeg arbejder på den fulde oplevelse 🎨
      </div>

      <section className="hero">
        <div className="section-content hero-grid">
          <h1 className="hero-logo">Tóra Tegner</h1>
          
          <div className="hero-image-container">
            <img 
              src={annaTora} 
              alt="Tóra Tegner" 
              className="profile-img"
            />
          </div>

          <div className="hero-text-container">
            <p className="hero-sub">Personlige kruseduller</p>
            <p className="hero-text">
              Kunst og visuel formidling særligt målrettet organisationer, virksomheder og sociale projekter med at kommunikere deres værdier, engagement og den forskel de skaber.
            </p>
            <div className="hero-social">
              <a href="https://www.instagram.com/tora_tegner/" target="_blank" rel="noopener noreferrer" className="social-button">
                <img src={instagramIkon} alt="Instagram" />
                <span>Se mere her</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="section-content">
          <h2>Bag om stregen</h2>
          <div className="info-text-container">
            <p className="info-text">
              Mit navn er Anna Tóra, og jeg er aspirerende visuel antropolog med en særlig interesse for, hvordan billeder, illustrationer og grafiske fortællinger kan gøre kompleks viden nærværende og engagerende.
            </p>
            <p className="info-text">
              Jeg er optaget af menneskers historier, erfaringer og perspektiver, og af hvordan visuel formidling kan skabe forståelse, dialog og forbindelse mellem mennesker. Gennem mit arbejde kombinerer jeg kreativitet, nysgerrighed og et antropologisk blik for at omsætte idéer og budskaber til visuelle fortællinger.
            </p>
            <p className="info-text">
              Jeg har grundlagt <strong>TÓRA TEGNER</strong>, hvor jeg arbejder med kunst og visuel formidling, der hjælper organisationer, virksomheder og projekter med at kommunikere deres værdier, engagement og den forskel, de skaber.
            </p>
            <p className="info-text">
              Jeg ønsker særligt at samarbejde med kulturelle, sociale og bæredygtige initiativer, som ønsker at gøre deres budskaber more synlige, menneskelige og engagerende.
            </p>
          </div>
        </div>
      </section>

      <section className="work-section">
        <div className="section-content">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Tidligere arbejde</h2>
          <div className="work-grid">
            <div className="work-card">
              <div className="work-item" {...openProps(peerPartnerskabetVideo, 'PeerPartnerskabet')}>
                <video src={`${peerPartnerskabetVideo}#t=0.001`} muted loop autoPlay playsInline />
              </div>
              <p className="work-item-title">PeerPartnerskabet</p>
            </div>
            <div className="work-card">
              <div className="work-item" {...openProps(urkVideo, 'URK Odense')}>
                <video src={`${urkVideo}#t=0.001`} muted loop autoPlay playsInline />
              </div>
              <p className="work-item-title">URK Odense</p>
            </div>
            <div className="work-card">
              <div className="work-item" {...openProps(moesgaardImg, 'Moesgaard')}>
                <img src={moesgaardImg} alt="Moesgaard" />
              </div>
              <p className="work-item-title">Moesgaard</p>
            </div>
            <div className="work-card">
              <div className="work-item" {...openProps(muskelsvindsfondenVideo, 'Muskelsvindsfonden')}>
                <video src={`${muskelsvindsfondenVideo}#t=0.001`} muted loop autoPlay playsInline />
              </div>
              <p className="work-item-title">Muskelsvinds<span className="mobile-break">-</span><br className="mobile-only-br" />fonden</p>
            </div>
          </div>
        </div>
      </section>

      <section className="exhibition-section">
        <div className="section-content">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Udstilling</h2>
          
          <div className="exhibition-block">
            <h3>Moesgaard Museum</h3>
            <div className="exhibition-text">
              <p>
                Som kurator på en studenterudstilling i samarbejde med Antropologi på Aarhus Universitet og Moesgaard Museum, havde jeg ansvaret for at skabe den visuelle sammenhæng og sikre en rød tråd gennem hele udstillingen.
              </p>
              <p>
                Mit arbejde indebar blandt andet at designe den overordnede visuelle identitet, herunder det grafiske banner og de personlige bogmærker, som de besøgende kunne tage med hjem for at fuldende oplevelsen af udstillingen.
              </p>
            </div>
            <div className="work-grid">
              <div className="work-item" {...openProps(moesgaardImg, 'Moesgaard')}>
                <img src={moesgaardImg} alt="Moesgaard" />
              </div>
              <div className="work-item" {...openProps(moesgaardBookmarks, 'Moesgaard bogmærker')}>
                <img src={moesgaardBookmarks} alt="Moesgaard bogmærker" />
              </div>
            </div>
          </div>

          <div className="exhibition-block" style={{ marginTop: '5rem' }}>
            <h3>ContainerKUNST</h3>
            <div className="exhibition-text">
              <p>
                I forbindelse med Esbjerg Festuge udviklede jeg et midlertidigt udstillings- og arbejdsrum i en container, der fungerede som både kunstudstilling, kreativt værksted og mødested.
              </p>
              <p>
                Projektet havde til formål at gøre kunsten mere tilgængelig og skabe et rum, hvor besøgende kunne få indblik i den kreative proces bag værkerne. Containeren rummede både større originale værker og "Tóras Malestue", hvor børn og familier blev inviteret til selv at udforske kreativiteten gennem farver og former.
              </p>
              <p>
                Som udstillingsformat skabte containeren en uformel ramme for dialog mellem kunstner og publikum. Besøgende kunne opleve kunsten på nært hold, stille spørgsmål til arbejdsprocessen og få indsigt i de muligheder og udfordringer, der følger med livet som selvstændig kunstner og kreativ iværksætter.
              </p>
              <p>
                Projektet fungerede samtidig som et eksperiment i publikumsinddragelse og formidling, hvor målet var at skabe møder på tværs af alder, baggrund og interesse for kunst.
              </p>
            </div>
            
            <div className="work-grid" style={{ marginTop: '3rem' }}>
              <div className="work-item" {...openProps(containerProces, 'ContainerKUNST proces')}>
                <video src={`${containerProces}#t=0.001`} muted loop autoPlay playsInline />
              </div>
              <div className="work-item" {...openProps(containerOpening, 'ContainerKUNST åbning')}>
                <video src={`${containerOpening}#t=0.001`} muted loop autoPlay playsInline />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="videos-section">
        <div className="section-content">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Min tegneproces</h2>
          <div className="work-grid">
            {processVideos.map((video, index) => (
              <div key={index} className="work-item" {...openProps(video.url, video.title)}>
                <video
                  src={`${video.url}#t=0.001`} 
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-content">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Udvalgte plakater</h2>
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
                  <div className="gallery-item" {...openProps(img.url, img.title)}>
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

      <section className="contact-section">
        <div className="section-content">
          <div className="contact-box">
            <h2>Skal jeg tegne noget til dig?</h2>
            <p style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              Hver illustration starter med en snak om dine ønsker og ideer. Ræk ud til mig her:
            </p>
            
            <div style={{ marginTop: '1rem' }}>
              <a href="mailto:tegnertora@gmail.com" className="contact-row">
                <img src={mailIkon} alt="Mail" />
                <span>tegnertora@gmail.com</span>
              </a>

              <a href="https://www.instagram.com/tora_tegner/" target="_blank" rel="noopener noreferrer" className="contact-row">
                <img src={instagramIkon} alt="Instagram" />
                <span>@tora_tegner</span>
              </a>

              <a href="https://www.linkedin.com/in/annatora/" target="_blank" rel="noopener noreferrer" className="contact-row">
                <img src={linkedinIkon} alt="LinkedIn" />
                <span>Anna Tora Holm Lund</span>
              </a>

              <a href="tel:+4524981587" className="contact-row">
                <img src={phoneIkon} alt="Telefon" />
                <span>+45 24 98 15 87</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-custom">
        &copy; {new Date().getFullYear()} Tóra Tegner. Alle rettigheder forbeholdes.
      </footer>

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Medie i stor visning"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedImage.endsWith('.mp4') ? (
              <video
                src={selectedImage}
                controls
                autoPlay
                loop
                style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '10px', border: '4px solid white' }}
              />
            ) : (
              <img src={selectedImage} alt="Fuld størrelse" />
            )}
            <button
              className="close-lightbox"
              onClick={() => setSelectedImage(null)}
              aria-label="Luk"
            >&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
