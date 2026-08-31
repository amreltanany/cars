import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { press } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Press() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.press-card',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="press" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#ff3b00]" />
          <span className="text-[10px] font-display uppercase tracking-[0.3em] text-[#ff3b00]">04 — Press</span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-none mb-16">
          In the <span className="text-stroke">Media</span>
        </h2>

        {/* Press grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {press.map((item, i) => (
            <article
              key={i}
              data-cursor="read"
              className="press-card group relative overflow-hidden rounded-sm border border-white/10 hover:border-[#ff3b00]/50 transition-colors duration-500 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#ff3b00] group-hover:border-[#ff3b00] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#ff3b00]">{item.source}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-[10px] font-display uppercase tracking-widest text-white/40">{item.date}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl uppercase leading-tight mb-3 group-hover:text-[#ff3b00] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-body">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
