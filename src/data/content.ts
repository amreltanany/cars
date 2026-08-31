export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

export interface PressItem {
  title: string;
  source: string;
  date: string;
  excerpt: string;
  image: string;
}

export const heroImage = 'https://images.pexels.com/photos/38243864/pexels-photo-38243864.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const portraitImage = 'https://images.pexels.com/photos/17631274/pexels-photo-17631274.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const stats = [
  { value: 10, suffix: '+', label: 'Years Racing' },
  { value: 17, suffix: '', label: 'Podium Finishes' },
  { value: 43, suffix: '', label: 'Races Entered' },
  { value: 5, suffix: '', label: 'Championships' },
];

export const timeline: TimelineEvent[] = [
  {
    year: '2014',
    title: 'First Lap',
    description: 'Started karting at age 12, winning the regional junior championship in the debut season.',
    image: 'https://images.pexels.com/photos/29702592/pexels-photo-29702592.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    year: '2017',
    title: 'Formula 4 Debut',
    description: 'Stepped into single-seaters. Secured first pole position at Zandvoort and finished P3 in the rookie standings.',
    image: 'https://images.pexels.com/photos/28680795/pexels-photo-28680795.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    year: '2019',
    title: 'GT4 European Series',
    description: 'Joined a factory-backed GT4 program. Two race wins and a championship challenge that went to the final round.',
    image: 'https://images.pexels.com/photos/20196376/pexels-photo-20196376.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    year: '2021',
    title: 'Endurance Racing',
    description: 'Moved to endurance competition. Completed the 24-hour classic with a P5 finish and the fastest night lap.',
    image: 'https://images.pexels.com/photos/32560129/pexels-photo-32560129.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    year: '2023',
    title: 'International Stage',
    description: 'Competed across three continents. Podium finishes in Spa, Suzuka, and Bathurst cemented a global reputation.',
    image: 'https://images.pexels.com/photos/33074675/pexels-photo-33074675.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    year: '2025',
    title: 'The Next Chapter',
    description: 'Signing with a top-tier prototype team for the 2026 season. The pursuit of a world title continues.',
    image: 'https://images.pexels.com/photos/28463904/pexels-photo-28463904.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const gallery: GalleryItem[] = [
  { image: 'https://images.pexels.com/photos/38243864/pexels-photo-38243864.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Pre-Race Focus', category: 'Portrait' },
  { image: 'https://images.pexels.com/photos/20196376/pexels-photo-20196376.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Wheel to Wheel', category: 'Action' },
  { image: 'https://images.pexels.com/photos/13857975/pexels-photo-13857975.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Pit Strategy', category: 'Behind the Scenes' },
  { image: 'https://images.pexels.com/photos/34222548/pexels-photo-34222548.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'The Helmet', category: 'Portrait' },
  { image: 'https://images.pexels.com/photos/32543863/pexels-photo-32543863.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Garage Talk', category: 'Behind the Scenes' },
  { image: 'https://images.pexels.com/photos/29289483/pexels-photo-29289483.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Red Mist', category: 'Action' },
  { image: 'https://images.pexels.com/photos/13237894/pexels-photo-13237894.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Workshop', category: 'Behind the Scenes' },
  { image: 'https://images.pexels.com/photos/17631274/pexels-photo-17631274.jpeg?auto=compress&cs=tinysrgb&w=1000', title: 'Ready to Race', category: 'Portrait' },
];

export const press: PressItem[] = [
  {
    title: 'Nick Ho: The Quiet Achiever Making Noise on Track',
    source: 'Motorsport Weekly',
    date: 'March 2025',
    excerpt: 'A profile on the driver who lets his lap times do the talking, and why the paddock is finally paying attention.',
    image: 'https://images.pexels.com/photos/32560129/pexels-photo-32560129.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'From Karts to Prototypes: A Decade in the Making',
    source: 'RaceTech Magazine',
    date: 'January 2025',
    excerpt: 'Tracing the career arc from a 12-year-old karting prodigy to a sought-after endurance prototype driver.',
    image: 'https://images.pexels.com/photos/28680795/pexels-photo-28680795.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'The Fastest Night Lap and What It Took',
    source: 'Endurance Report',
    date: 'November 2024',
    excerpt: 'Breaking down the data behind the record-setting night lap and the setup philosophy that made it possible.',
    image: 'https://images.pexels.com/photos/10373663/pexels-photo-10373663.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Why Spa Rewards the Patient',
    source: 'Trackside Journal',
    date: 'August 2024',
    excerpt: 'A deep dive into the approach that delivered a podium at one of motorsport\u2019s most demanding circuits.',
    image: 'https://images.pexels.com/photos/16743653/pexels-photo-16743653.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];
