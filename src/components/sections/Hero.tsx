import { useEffect, useRef, useState } from 'react';
import DepthImage from '@/components/DepthImage';
import { generateDepthMap } from '@/utils/depthMap';
import { heroImage } from '@/data/content';
import { gsap } from 'gsap';

export default function Hero() {
  const [depthMap, setDepthMap] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateDepthMap(heroImage).then(setDepthMap).catch(() => setDepthMap(null));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out', delay: 0.3 }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [depthMap]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Depth image background */}
      <div className="absolute inset-0 z-0">
        {depthMap && (
          <DepthImage
            imageSrc={heroImage}
            depthSrc={depthMap}
            parallaxStrength={0.06}
            className="w-full h-full"
          />
        )}
        {!depthMap && (
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12">
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="font-display uppercase leading-[0.85] text-[15vw] md:text-[12vw] lg:text-[10vw]">
            <span className="hero-line block">Nick</span>
            <span className="hero-line block text-stroke">Ho</span>
          </h1>
        </div>

        <div ref={subRef} className="mt-6 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-md">
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-body">
              Professional racing driver. Endurance specialist. A decade of chasing
              the limit across the world's most demanding circuits.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.querySelector('#history')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor="explore"
              className="group flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-[#ff3b00] hover:bg-[#ff3b00] transition-all duration-300 rounded-full"
            >
              <span className="text-xs font-display uppercase tracking-widest">Explore Career</span>
              <span className="w-6 h-px bg-white group-hover:w-10 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-display uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Side label */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 z-10 hidden lg:block">
        <span className="text-[10px] font-display uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-rl]">
          Est. 2014 — Racing Driver
        </span>
      </div>
    </section>
  );
}
