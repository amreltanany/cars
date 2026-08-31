import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gallery } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsDragging(true);
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      isDown = false;
      setIsDragging(false);
      track.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      setIsDragging(false);
      track.style.cursor = 'grab';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    };

    track.addEventListener('mousedown', onMouseDown);
    track.addEventListener('mouseleave', onMouseLeave);
    track.addEventListener('mouseup', onMouseUp);
    track.addEventListener('mousemove', onMouseMove);

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      track.removeEventListener('mouseleave', onMouseLeave);
      track.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#ff3b00]" />
          <span className="text-[10px] font-display uppercase tracking-[0.3em] text-[#ff3b00]">03 — Gallery</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-none">
            On <span className="text-stroke">Track</span>
          </h2>
          <div className="flex items-center gap-3 text-white/40">
            <span className="text-xs font-display uppercase tracking-widest">Drag to explore</span>
            <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors ${isDragging ? 'border-[#ff3b00] bg-[#ff3b00]/10' : ''}`}>
              <span className="text-xs">↔</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drag carousel */}
      <div
        ref={trackRef}
        data-cursor="drag"
        className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-12 pb-6 select-none"
        style={{ cursor: 'grab', scrollbarWidth: 'none' }}
      >
        {gallery.map((item, i) => (
          <div
            key={i}
            className="gallery-item shrink-0 group"
            style={{ width: i % 3 === 0 ? 'min(420px, 80vw)' : 'min(340px, 70vw)' }}
          >
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: i % 3 === 0 ? '3/4' : '1/1' }}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#ff3b00] block mb-1">
                  {item.category}
                </span>
                <h3 className="font-display text-lg uppercase">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
