export default function Marquee() {
  const items = ['Endurance', 'Precision', 'Speed', 'Focus', 'Determination', 'Adrenaline'];
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="relative py-8 md:py-12 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="font-display text-4xl md:text-6xl lg:text-7xl uppercase mx-6 inline-flex items-center gap-6">
            <span className={i % 2 === 0 ? 'text-white' : 'text-stroke'}>{item}</span>
            <span className="text-[#ff3b00] text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
