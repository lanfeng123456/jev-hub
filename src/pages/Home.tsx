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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Primitives />
        <Advantages />
        <QuickStart />
        <Guides />
        <Cases />
        <VideoWall />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
