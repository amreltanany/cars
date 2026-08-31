import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <footer ref={sectionRef} id="contact" className="relative bg-black pt-24 md:pt-32 pb-10 px-6 md:px-12 overflow-hidden">
      {/* Giant background text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <h2 className="font-display text-[25vw] leading-none text-white/[0.03] uppercase whitespace-nowrap">
          Nick Ho
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* CTA */}
        <div className="footer-reveal mb-20">
          <p className="text-sm font-display uppercase tracking-widest text-[#ff3b00] mb-4">Let's talk</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-none mb-8">
            Get in <span className="text-stroke">touch</span>
          </h2>
          <a
            href="mailto:contact@nickho-motorsports.com"
            data-cursor="email"
            className="font-display text-2xl md:text-4xl uppercase hover:text-[#ff3b00] transition-colors duration-300 inline-block"
          >
            contact@nickho-motorsports.com
          </a>
        </div>

        {/* Newsletter */}
        <div className="footer-reveal grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 pb-20 border-b border-white/10">
          <div>
            <h3 className="font-display text-xl md:text-2xl uppercase mb-2">Stay Updated</h3>
            <p className="text-sm text-white/40 font-body">Race reports, behind-the-scenes content, and career updates.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border-b border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff3b00] transition-colors font-body"
            />
            <button
              type="submit"
              data-cursor="send"
              className="px-6 py-3 bg-[#ff3b00] text-white text-xs font-display uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              {sent ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="footer-reveal grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'History', 'Gallery'].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-white/60 hover:text-[#ff3b00] transition-colors font-body"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-4">Social</h4>
            <ul className="space-y-3">
              <li><a href="#" data-cursor="visit" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#ff3b00] transition-colors font-body"><Instagram className="w-4 h-4" /> Instagram</a></li>
              <li><a href="#" data-cursor="visit" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#ff3b00] transition-colors font-body"><Twitter className="w-4 h-4" /> Twitter</a></li>
              <li><a href="#" data-cursor="visit" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#ff3b00] transition-colors font-body"><Youtube className="w-4 h-4" /> YouTube</a></li>
              <li><a href="#" data-cursor="visit" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#ff3b00] transition-colors font-body"><Mail className="w-4 h-4" /> Email</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-4">Partners</h4>
            <ul className="space-y-2">
              {['Race Team', 'Engine Builder', 'Helmet Sponsor', 'Apparel'].map((l) => (
                <li key={l} className="text-sm text-white/60 font-body">{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-4">Base</h4>
            <p className="text-sm text-white/60 font-body leading-relaxed">
              Motorsport Complex<br />
              Circuit Zandvoort<br />
              Netherlands
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-reveal flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30 font-body">© 2025 Nick Ho Motorsports. All rights reserved.</p>
          <p className="text-xs text-white/30 font-body">Built for speed, on and off the track.</p>
        </div>
      </div>
    </footer>
  );
}
