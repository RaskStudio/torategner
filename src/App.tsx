import { useState, useEffect, useRef, Fragment } from 'react'
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

// Import værker til salg (restsalg fra ContainerKUNST)
import salgPianisten from './assets/til-salg/IMG_7047.jpeg'
import salgSangeren from './assets/til-salg/IMG_7049.jpeg'
import salgTrommeslageren from './assets/til-salg/IMG_7042.jpeg'
import salgFlamenco from './assets/til-salg/IMG_7054.jpeg'
import salgVin from './assets/til-salg/IMG_7053.jpeg'
import salgAbstraktA from './assets/til-salg/IMG_7035.jpeg'
import salgAbstraktB from './assets/til-salg/IMG_7039.jpeg'
import salgKoral from './assets/til-salg/IMG_7058.jpeg'
import salgMalebog1 from './assets/til-salg/IMG_7220.jpeg' // forside
import salgMalebog2 from './assets/til-salg/IMG_7217.jpeg' // opslag
import salgMalebog3 from './assets/til-salg/IMG_7208.jpeg' // opslag
import salgMalebog4 from './assets/til-salg/IMG_7219.jpeg' // bagside

// ────────────────────────────────────────────────────────────────────────────
// VÆRKER TIL SALG
//
// Rediger denne liste for at styre "Til salg"-sektionen.
//   images – ét eller flere fotos af værket. Det første vises som hovedbillede,
//            resten kan klikkes frem via små miniaturer. Tilføj bare flere her
//            efterhånden som de kommer (husk at importere dem øverst).
//   title  – værkets navn (vises stort)
//   size   – mål, fx "30 × 42 cm (A3)". Tomt = vises ikke.
//   price  – pris, fx "800 kr". Tomt = der står "Pris på forespørgsel".
//   frame  – ramme, fx "Hvid ramme" eller "Kun print (uden ramme)".
//   note   – valgfri lille linje, fx "Så længe lager haves" (tom = vises ikke).
//   sold   – sæt til true når værket er solgt (viser "Solgt"-stempel).
//
// 👉 TODO til Tóra: udfyld størrelse + pris på hvert værk (de står tomme nu),
//    og ret titlerne til hvis de skal hedde noget andet.
// ────────────────────────────────────────────────────────────────────────────
type Artwork = {
  images: string[]
  title: string
  size: string
  price: string
  frame: string
  note?: string
  sold: boolean
}

// Samlet tilbud på de tre musikere (Pianisten + Sangeren + Trommeslageren)
const BUNDLE = {
  price: '1.500 kr',
  fullPrice: '1.725 kr',
  save: 'Spar 225 kr',
}

const artworksForSale: Artwork[] = [
  { images: [salgPianisten],     title: 'Pianisten',      size: 'A3 (30 × 42 cm)', price: '575 kr',   frame: 'Hvid træramme', sold: false },
  { images: [salgSangeren],      title: 'Sangeren',       size: 'A3 (30 × 42 cm)', price: '575 kr',   frame: 'Træramme',      sold: false },
  { images: [salgTrommeslageren], title: 'Trommeslageren', size: 'A3 (30 × 42 cm)', price: '575 kr',   frame: 'Blå træramme',  sold: false },
  { images: [salgFlamenco],      title: 'Flamingo',       size: 'A3 (30 × 42 cm)', price: '575 kr',   frame: 'Blå træramme',  sold: false },
  { images: [salgVin],           title: 'Festen',         size: 'A3 (30 × 42 cm)', price: '575 kr',   frame: 'Hvid træramme', sold: false },
  { images: [salgAbstraktA],     title: 'Sammen',         size: '70 × 100 cm',     price: '1.000 kr', frame: 'Plastikramme',  sold: false },
  { images: [salgAbstraktB],     title: 'Liv',            size: '70 × 100 cm',     price: '1.000 kr', frame: 'Plastikramme',  sold: false },
  { images: [salgKoral],         title: 'Tvillingerne',   size: '40 × 50 cm',      price: '1.000 kr', frame: 'Plastikramme',  note: 'Serien sælges samlet', sold: false },
  { images: [salgMalebog1, salgMalebog2, salgMalebog3, salgMalebog4], title: 'Tóras Krusedulle Malebog', size: 'A5 · 20 illustrationer', price: '350 kr', frame: '', note: '300g papir velegnet til akvarelmaling', sold: false },
]

// Bygger en "skriv for at købe"-mail med værkets titel forudfyldt
function buyMailto(title: string) {
  const subject = `Køb af værk: ${title}`
  const body = `Hej Tóra\n\nJeg er interesseret i at købe "${title}". Er det stadig ledigt?\n\nVenlig hilsen\n`
  return `mailto:tegnertora@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// Generisk popup. Lukkes med Escape, klik udenfor eller luk-knappen.
// Låser baggrundens scroll mens den er åben.
function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Luk">&times;</button>
        {children}
      </div>
    </div>
  )
}

// Simpelt kort i galleriet: ét billede + titel + pris. Klik åbner detaljerne.
function SaleCard({ art, onSelect }: { art: Artwork; onSelect: () => void }) {
  return (
    <div
      className={`sale-card${art.sold ? ' is-sold' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Se ${art.title}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="sale-media">
        <img src={art.images[0]} alt={art.title} loading="lazy" />
        {art.sold && <span className="sale-badge">Solgt</span>}
      </div>
      <div className="sale-info">
        <h3 className="sale-title">{art.title}</h3>
        <p className="sale-price">{art.price || 'Pris på forespørgsel'}</p>
      </div>
    </div>
  )
}

// Detalje-popup for ét værk: billede(r), al info og kontakt.
function ArtworkModal({ art, onClose }: { art: Artwork; onClose: () => void }) {
  const [active, setActive] = useState(0)

  return (
    <Modal onClose={onClose}>
      <div className="detail">
        <div className="detail-media">
          <img className="detail-photo" src={art.images[active]} alt={art.title} />
          {art.images.length > 1 && (
            <div className="sale-thumbs">
              {art.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`sale-thumb${i === active ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Vis foto ${i + 1} af ${art.title}`}
                  aria-pressed={i === active}
                >
                  <img src={img} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h3 className="detail-title">{art.title}</h3>
          <p className="sale-meta">{[art.size, art.frame].filter(Boolean).join(' · ')}</p>
          {art.note && <p className="sale-note">{art.note}</p>}
          <p className="detail-price">{art.price || 'Pris på forespørgsel'}</p>

          {art.sold ? (
            <span className="sale-buy is-disabled">Solgt</span>
          ) : (
            <div className="detail-actions">
              <a className="sale-buy" href={buyMailto(art.title)}>Skriv for at købe</a>
              <a
                className="sale-ig"
                href="https://www.instagram.com/tora_tegner/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Skriv om ${art.title} på Instagram`}
              >
                <img src={instagramIkon} alt="" aria-hidden="true" />
                <span>eller skriv på Instagram</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

// Tilbuds-kort: Musik-serien samlet til rabat. Simpelt kort – klik åbner detaljer.
function MusicBundleCard({ onSelect }: { onSelect: () => void }) {
  const thumbs = [salgPianisten, salgSangeren, salgTrommeslageren]
  return (
    <div
      className="sale-card bundle-card"
      role="button"
      tabIndex={0}
      aria-label="Se Musik-serien (samlet tilbud)"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="bundle-media">
        <span className="bundle-tag">{BUNDLE.save}</span>
        <span className="bundle-heading">Alle tre musikere</span>
        <div className="bundle-thumbs">
          {thumbs.map((img, i) => (
            <span className="bundle-thumb" key={i}>
              <img src={img} alt="" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
      <div className="sale-info">
        <h3 className="sale-title">Musik-serien</h3>
        <p className="sale-price">
          <span className="bundle-old">{BUNDLE.fullPrice}</span> {BUNDLE.price}
        </p>
      </div>
    </div>
  )
}

// Detalje-popup for Musik-serien (samlet tilbud)
function BundleModal({ onClose }: { onClose: () => void }) {
  const works = [
    { img: salgPianisten, title: 'Pianisten' },
    { img: salgSangeren, title: 'Sangeren' },
    { img: salgTrommeslageren, title: 'Trommeslageren' },
  ]
  const subject = 'Køb af Musik-serien (alle tre)'
  const body = `Hej Tóra\n\nJeg er interesseret i at købe hele Musik-serien samlet – Pianisten, Sangeren og Trommeslageren – for ${BUNDLE.price}. Er den stadig ledig?\n\nVenlig hilsen\n`
  const mailto = `mailto:tegnertora@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <Modal onClose={onClose}>
      <div className="detail">
        <div className="detail-media bundle-detail-media">
          {works.map((w, i) => (
            <figure className="bundle-detail-item" key={i}>
              <img src={w.img} alt={w.title} />
              <figcaption>{w.title}</figcaption>
            </figure>
          ))}
        </div>

        <div className="detail-info">
          <h3 className="detail-title">Musik-serien</h3>
          <p className="sale-meta">Pianisten · Sangeren · Trommeslageren · A3</p>
          <p className="sale-note">Køb alle tre musikere samlet og spar 225 kr.</p>
          <p className="detail-price">
            <span className="bundle-old">{BUNDLE.fullPrice}</span> {BUNDLE.price}
          </p>
          <div className="detail-actions">
            <a className="sale-buy" href={mailto}>Køb alle tre samlet</a>
            <a
              className="sale-ig"
              href="https://www.instagram.com/tora_tegner/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skriv om Musik-serien på Instagram"
            >
              <img src={instagramIkon} alt="" aria-hidden="true" />
              <span>eller skriv på Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

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

// Lille hash-baseret router uden ekstra biblioteker.
// '' = forsiden, 'til-salg' = salgssiden (#til-salg i adresselinjen).
function useHashRoute() {
  const getRoute = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(getRoute)
  useEffect(() => {
    const onChange = () => {
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// Kontakt-sektionen bruges både på forsiden og på salgssiden
function ContactSection() {
  return (
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
  )
}

// Salgssiden (#til-salg): galleri af værker til salg + kontakt
function SalePage() {
  const [selected, setSelected] = useState<Artwork | null>(null)
  const [bundleOpen, setBundleOpen] = useState(false)

  return (
    <>
      <section className="sale-section sale-page">
        <div className="section-content">
          <a className="back-link" href="#">← Tilbage til forsiden</a>
          <h1 className="sale-page-title">Til salg</h1>
          <p className="sale-intro">
            Nåede du ikke forbi ContainerKUNST – eller kunne du tænke dig et værk?
          </p>

          <div className="sale-grid">
            {artworksForSale.map((art, index) => (
              <Fragment key={index}>
                <SaleCard art={art} onSelect={() => setSelected(art)} />
                {index === 2 && <MusicBundleCard onSelect={() => setBundleOpen(true)} />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {selected && <ArtworkModal art={selected} onClose={() => setSelected(null)} />}
      {bundleOpen && <BundleModal onClose={() => setBundleOpen(false)} />}
    </>
  )
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const route = useHashRoute()

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
      {route === 'til-salg' ? (
        <SalePage />
      ) : (
        <>
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
              Jeg har grundlagt <strong>TÓRA TEGNER</strong> for at hjælpe organisationer, projekter og initiativer med at kommunikere klart, menneskeligt og visuelt.
            </p>
            <p className="info-text">
              Jeg samarbejder særligt med kulturelle, sociale og bæredygtige aktører, som ønsker at styrke deres fortælling og skabe større synlighed og forbindelse til deres målgrupper.
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
            <blockquote className="exhibition-quote">
              <span className="exhibition-quote-meta">
                <span className="exhibition-quote-label">Instagram</span> - Moesgaard
              </span>
              <p className="exhibition-quote-text">
                “Familie er ikke bare noget, vi er, men noget, vi gør”
              </p>
              <a
                className="article-button"
                href="https://www.instagram.com/p/DK-MbF8p_Wm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Se opslaget
              </a>
            </blockquote>
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
            <blockquote className="exhibition-quote">
              <span className="exhibition-quote-meta">
                <span className="exhibition-quote-label">Artikel</span> - Ryk Ind Ribe
              </span>
              <p className="exhibition-quote-text">
                “Jeg får lov til at bruge min egen streg, som jeg kalder for kruseduller, til at formidle nogle større fortællinger”
              </p>
              <a
                className="article-button"
                href="https://rykindribe.dk/artikler/kulturer-kunst-og-udsyn-anna-tora-holm-lund/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Læs hele artiklen
              </a>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="sale-teaser">
        <div className="section-content">
          <h2>Til salg</h2>
          <p className="sale-teaser-text">
            Nåede du ikke forbi ContainerKUNST – eller kunne du tænke dig et værk?
          </p>

          <div className="work-grid sale-teaser-previews">
            {artworksForSale.slice(0, 4).map((art, i) => (
              <a className="work-item" href="#til-salg" key={i} aria-label={`Se ${art.title} til salg`}>
                <img src={art.images[0]} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>

          <a className="sale-buy" href="#til-salg">Se alle værker til salg</a>
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

      <ContactSection />
        </>
      )}

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
