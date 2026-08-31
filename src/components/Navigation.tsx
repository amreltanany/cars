import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import AudioToggle from './AudioToggle';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'History', href: '#history' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Press', href: '#press' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-5">
          <button
            onClick={() => scrollTo('#home')}
            data-cursor="click"
            className="font-display text-xl md:text-2xl uppercase tracking-tight leading-none"
          >
            Nick<span className="text-[#ff3b00]">.</span>Ho
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                data-cursor="click"
                className="text-xs font-display uppercase tracking-widest text-white/60 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff3b00] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <AudioToggle />
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[8500] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="font-display text-3xl uppercase text-white/80 hover:text-[#ff3b00] transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
