import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats, portraitImage } from '@/data/content';
import DepthImage from '@/components/DepthImage';
import { generateDepthMap } from '@/utils/depthMap';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numEl = el.querySelector('.stat-num');
    if (!numEl) return;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val).toString();
          },
        });
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline">
        <span className="stat-num font-display text-5xl md:text-7xl lg:text-8xl leading-none">0</span>
        <span className="font-display text-3xl md:text-5xl text-[#ff3b00] leading-none">{suffix}</span>
      </div>
      <span className="mt-3 text-xs font-display uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}

export default function About() {
  const [depthMap, setDepthMap] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateDepthMap(portraitImage).then(setDepthMap).catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-word',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const aboutText =
    'Racing is not about the trophy. It is about the pursuit — the relentless refinement of every braking zone, every apex, every lap. For over a decade, Nick Ho has lived that pursuit across karting circuits, single-seater grids, and endurance paddocks around the world.';

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-px bg-[#ff3b00]" />
          <span className="text-[10px] font-display uppercase tracking-[0.3em] text-[#ff3b00]">01 — About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            {depthMap ? (
              <DepthImage
                imageSrc={portraitImage}
                depthSrc={depthMap}
                parallaxStrength={0.1}
                className="w-full h-full"
              />
            ) : (
              <img src={portraitImage} alt="Nick Ho" className="w-full h-full object-cover" />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <span className="text-xs font-display uppercase tracking-widest text-white/60">Nick Ho, 2025</span>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef}>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight uppercase">
              {aboutText.split(' ').map((word, i) => (
                <span key={i} className="about-word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-24 md:mt-32 pt-12 border-t border-white/10">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
