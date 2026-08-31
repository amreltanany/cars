import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const scrollDistance = totalWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance + window.innerHeight * 0.3}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            // Active card highlight
            const cards = track.querySelectorAll('.timeline-card');
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="history" className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Section header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-24 px-6 md:px-12 pointer-events-none">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#ff3b00]" />
          <span className="text-[10px] font-display uppercase tracking-[0.3em] text-[#ff3b00]">02 — History</span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-none">
          The <span className="text-stroke">Journey</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div className="h-screen flex items-center">
        <div ref={trackRef} className="flex gap-6 md:gap-10 pl-6 md:pl-12 will-change-transform">
          {/* Spacer for header */}
          <div className="shrink-0 w-[40vw] md:w-[30vw] flex items-end pb-16">
            <p className="text-sm text-white/40 max-w-xs font-body leading-relaxed">
              A decade of progression — from junior karting to international endurance racing.
              Scroll to trace the path.
            </p>
          </div>

          {timeline.map((event, i) => (
            <div
              key={event.year}
              className="timeline-card shrink-0 w-[80vw] md:w-[42vw] lg:w-[34vw] group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-display uppercase tracking-widest text-white/50">
                    {String(i + 1).padStart(2, '0')} / {String(timeline.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="font-display text-3xl md:text-5xl text-[#ff3b00] leading-none">{event.year}</span>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-display text-xl md:text-2xl uppercase mb-2">{event.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-sm font-body">{event.description}</p>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="shrink-0 w-[20vw] flex items-center">
            <span className="font-display text-2xl text-white/20 uppercase">To be continued...</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20 pointer-events-none">
        <div className="h-px bg-white/10 relative">
          <div ref={progressRef} className="absolute top-0 left-0 h-px bg-[#ff3b00] w-0 transition-[width] duration-75" />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-display uppercase tracking-widest text-white/30">2014</span>
          <span className="text-[10px] font-display uppercase tracking-widest text-white/30">2025</span>
        </div>
      </div>
    </section>
  );
}
