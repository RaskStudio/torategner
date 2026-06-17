import { useState, useEffect, useRef } from 'react'
import './index.css'

// Import billeder
import annaTora from './assets/Anna Tora.png'
import moesgaardImg from './assets/Moesgaard.jpg'
import moesgaardBookmarks from './assets/Moesgaard bogmærker.jpg'

// Import videoer – thumb = lille muted preview, full = høj kvalitet m. lyd til lightbox
import containerProcesThumb from './assets/thumbs/containerKunst proces.mp4'
import containerProcesFull from './assets/full/containerKunst proces.mp4'
import containerOpeningThumb from './assets/thumbs/container_opening.mp4'
import containerOpeningFull from './assets/full/container_opening.mp4'
import urkThumb from './assets/thumbs/URK.mp4'
import urkFull from './assets/full/URK.mp4'
import peerPartnerskabetThumb from './assets/thumbs/Peerpartnerskabet.mp4'
import peerPartnerskabetFull from './assets/full/Peerpartnerskabet.mp4'
import muskelsvindsfondenThumb from './assets/thumbs/Muskelsvindsfonden.mp4'
import muskelsvindsfondenFull from './assets/full/Muskelsvindsfonden.mp4'
import tegneproces1Thumb from './assets/thumbs/Tegneproces 1.mp4'
import tegneproces1Full from './assets/full/Tegneproces 1.mp4'
import tegneproces2Thumb from './assets/thumbs/Tegneproces 2.mp4'
import tegneproces2Full from './assets/full/Tegneproces 2.mp4'
import tegneproces3Thumb from './assets/thumbs/Tegneproces 3.mp4'
import tegneproces3Full from './assets/full/Tegneproces 3.mp4'
import printProcesThumb from './assets/thumbs/Print proces.mp4'
import printProcesFull from './assets/full/Print proces.mp4'

// Import ikoner
import instagramIkon from './assets/instagram_ikon.png'
import mailIkon from './assets/mail_ikon.png'
import linkedinIkon from './assets/linkedin_ikon.png'
import phoneIkon from './assets/phone_ikon.png'

// Thumbnail-video der kun afspiller når den er synlig på skærmen.
// Sparer data og batteri på mobil, hvor mange videoer ellers kører samtidig.
function ThumbVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={`${src}#t=0.001`}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

// Lightbox-video i fuld størrelse. Forsøger at afspille med lyd; hvis browseren
// blokerer autoplay med lyd, falder den tilbage til muted, så der altid kommer
// billede op (brugeren kan så slå lyd til via kontrollerne).
function LightboxVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.play().catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })
  }, [src])

  return (
    <video
      ref={ref}
      src={src}
      controls
      loop
      playsInline
      preload="auto"
      style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '10px', border: '4px solid white' }}
    />
  )
}

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

  const processVideos = [
    { thumb: tegneproces1Thumb, full: tegneproces1Full, title: "Tegneproces I" },
    { thumb: tegneproces2Thumb, full: tegneproces2Full, title: "Tegneproces II" },
    { thumb: tegneproces3Thumb, full: tegneproces3Full, title: "Tegneproces III" },
    { thumb: printProcesThumb, full: printProcesFull, title: "Fra skærm til print" }
  ]

  return (
    <div className="app">
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
              Kunst og visuel formidling særligt målrettet organisationer, virksomheder og sociale projekter der ønsker at kommunikere deres værdier, engagement og den forskel de skaber.
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
          <h2 style={{ marginBottom: '3rem' }}>Tidligere arbejde</h2>
          <div className="work-grid">
            <div className="work-card">
              <div className="work-item" {...openProps(peerPartnerskabetFull, 'PeerPartnerskabet')}>
                <ThumbVideo src={peerPartnerskabetThumb} />
              </div>
              <p className="work-item-title">PeerPartnerskabet</p>
            </div>
            <div className="work-card">
              <div className="work-item" {...openProps(urkFull, 'URK Odense')}>
                <ThumbVideo src={urkThumb} />
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
              <div className="work-item" {...openProps(muskelsvindsfondenFull, 'Muskelsvindsfonden')}>
                <ThumbVideo src={muskelsvindsfondenThumb} />
              </div>
              <p className="work-item-title">Muskelsvinds<span className="mobile-break">-</span><br className="mobile-only-br" />fonden</p>
            </div>
          </div>
        </div>
      </section>

      <section className="exhibition-section">
        <div className="section-content">
          <h2 style={{ marginBottom: '3rem' }}>Udstilling</h2>
          
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
            <div className="work-grid exhibition-media">
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
            <div className="work-grid exhibition-media">
              <div className="work-item" {...openProps(containerProcesFull, 'ContainerKUNST proces')}>
                <ThumbVideo src={containerProcesThumb} />
              </div>
              <div className="work-item" {...openProps(containerOpeningFull, 'ContainerKUNST åbning')}>
                <ThumbVideo src={containerOpeningThumb} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="videos-section">
        <div className="section-content">
          <h2 style={{ marginBottom: '3rem' }}>Min tegneproces</h2>
          <div className="work-grid">
            {processVideos.map((video, index) => (
              <div key={index} className="work-item" {...openProps(video.full, video.title)}>
                <ThumbVideo src={video.thumb} />
              </div>
            ))}
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
              <LightboxVideo src={selectedImage} />
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
