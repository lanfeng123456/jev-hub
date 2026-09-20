import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Overview from '../sections/Overview'
import Primitives from '../sections/Primitives'
import Advantages from '../sections/Advantages'
import QuickStart from '../sections/QuickStart'
import Cases from '../sections/Cases'
import VideoWall from '../sections/VideoWall'
import Faq from '../sections/Faq'
import Footer from '../sections/Footer'
import Guides from '../sections/Guides'
import AdPlacement from '../components/AdPlacement'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <div className="home-content-layout">
        <div className="home-content">
        <Overview />
        <Primitives />
        <Advantages />
        <QuickStart />
        <Guides />
        <Cases />
        <VideoWall />
        <Faq />
        <AdPlacement unit="short" />
        </div>
        <aside className="ad-sidebar home-sidebar" aria-label="Advertisement / 广告">
          <AdPlacement unit="tall" />
        </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
