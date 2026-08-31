import { useEffect, useRef, useState } from 'react';

export default function ScrollWalker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [legPhase, setLegPhase] = useState(0);
  const [direction, setDirection] = useState(1);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let raf = 0;
    let currentX = 0;
    let currentLegPhase = 0;
    let lastTime = performance.now();

    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const targetProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Determine scroll direction
      if (scrollY > lastScrollY.current + 1) {
        setDirection(1);
      } else if (scrollY < lastScrollY.current - 1) {
        setDirection(-1);
      }
      lastScrollY.current = scrollY;

      // Smoothly interpolate progress
      currentX += (targetProgress - currentX) * 0.06;

      // Walking animation speed tied to scroll velocity
      const scrollDelta = Math.abs(targetProgress - currentX);
      const walkSpeed = 2 + scrollDelta * 40;
      currentLegPhase += dt * walkSpeed * Math.max(0.3, Math.abs(targetProgress - currentX + 0.01) * 8);

      setProgress(currentX);
      setLegPhase(currentLegPhase);

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Map scroll progress to horizontal position across the viewport
  // Walk left-to-right from 5% to 95% of screen width
  const leftPercent = 5 + progress * 90;

  // Leg swing animation using sine wave
  const legAngle = Math.sin(legPhase) * 30;
  const armAngle = -Math.sin(legPhase) * 25;
  const bodyBob = Math.abs(Math.sin(legPhase)) * 4;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 z-[8000] pointer-events-none transition-opacity duration-500"
      style={{
        left: `${leftPercent}%`,
        transform: `translateX(-50%) scaleX(${direction})`,
        opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
      }}
    >
      <svg
        width="48"
        height="72"
        viewBox="0 0 48 72"
        fill="none"
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 0 8px rgba(255,59,0,0.4))' }}
      >
        {/* Head */}
        <circle
          cx="24"
          cy="10"
          r="6"
          fill="none"
          stroke="#ff3b00"
          strokeWidth="2.5"
        />
        {/* Helmet visor line */}
        <path
          d="M19 9 Q24 6 29 9"
          fill="none"
          stroke="#ff3b00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body */}
        <line
          x1="24"
          y1="16"
          x2="24"
          y2={42 - bodyBob}
          stroke="#ff3b00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Arms - swinging */}
        <line
          x1="24"
          y1="22"
          x2={24 + Math.sin(armAngle * (Math.PI / 180)) * 12}
          y2={22 + Math.abs(Math.cos(armAngle * (Math.PI / 180))) * 12}
          stroke="#ff3b00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="22"
          x2={24 - Math.sin(armAngle * (Math.PI / 180)) * 12}
          y2={22 + Math.abs(Math.cos(armAngle * (Math.PI / 180))) * 12}
          stroke="#ff3b00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Left leg - forward/back swing */}
        <line
          x1="24"
          y1={42 - bodyBob}
          x2={24 + Math.sin(legAngle * (Math.PI / 180)) * 14}
          y2={42 - bodyBob + Math.abs(Math.cos(legAngle * (Math.PI / 180))) * 18}
          stroke="#ff3b00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Right leg - opposite swing */}
        <line
          x1="24"
          y1={42 - bodyBob}
          x2={24 - Math.sin(legAngle * (Math.PI / 180)) * 14}
          y2={42 - bodyBob + Math.abs(Math.cos(legAngle * (Math.PI / 180))) * 18}
          stroke="#ff3b00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Shadow */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[#ff3b00]/20 blur-sm"
        style={{ width: 32, height: 6 }}
      />
    </div>
  );
}
