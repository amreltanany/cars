import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]') as HTMLElement | null;
      if (interactive) {
        setLabel(interactive.dataset.cursor || '');
        setIsPointer(true);
      } else if (target.closest('a, button, [role="button"]')) {
        setLabel('');
        setIsPointer(true);
      } else {
        setLabel('');
        setIsPointer(false);
      }
    };

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#ff3b00] rounded-full pointer-events-none z-[10000] mix-blend-difference"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-difference transition-[width,height,border-color] duration-300 ease-out flex items-center justify-center ${
          isPointer ? 'w-16 h-16 border-[#ff3b00]' : 'w-8 h-8 border-white/60'
        } border`}
      >
        {label && (
          <span className="text-[8px] font-display uppercase tracking-wider text-[#ff3b00]">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
