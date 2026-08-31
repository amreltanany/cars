import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import History from './components/sections/History';
import Marquee from './components/sections/Marquee';
import Gallery from './components/sections/Gallery';
import Press from './components/sections/Press';
import Footer from './components/sections/Footer';
import ScrollWalker from './components/ScrollWalker';

function App() {
  return (
    <SmoothScroll>
      <div className="relative bg-[#0a0a0a] text-white min-h-screen">
        <div className="noise-overlay" />
        <CustomCursor />
        <ScrollWalker />
        <Navigation />
        <main>
          <Hero />
          <About />
          <History />
          <Marquee />
          <Gallery />
          <Press />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
