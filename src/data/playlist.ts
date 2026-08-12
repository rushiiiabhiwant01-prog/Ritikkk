export interface Track {
  id: string;
  title: string;
  artist: string;
  movie: string;
  year: string;
  duration: string;
  youtubeId: string;
  albumCover: string;
  chachaCommentary: string;
}

export const YOUTUBE_PLAYLIST_ID = "PLbmMrWAisRjw";

export const CHACHA_PLAYLIST: Track[] = [
  {
    id: "1",
    title: "Aap Ki Ankhon Mein Kuch",
    artist: "Kishore Kumar & Lata Mangeshkar",
    movie: "Ghar",
    year: "1978",
    duration: "4:10",
    youtubeId: "eY7C_3uM5jI",
    albumCover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Arre waah! RD Burman sahab ka magic. Yeh gaana bajte hi malish ka maza double ho jata hai!"
  },
  {
    id: "2",
    title: "Gulabi Aankhen Jo Teri Dekhi",
    artist: "Mohammed Rafi",
    movie: "The Train",
    year: "1970",
    duration: "3:18",
    youtubeId: "hgi2MYb214A",
    albumCover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Aha! Rafi Sahab ki aawaz! Is song pe toh poore town me cutting mashhoor thi hamari!"
  },
  {
    id: "3",
    title: "Kya Hua Tera Wada",
    artist: "Mohammed Rafi & Sushma Shrestha",
    movie: "Hum Kisise Kum Naheen",
    year: "1977",
    duration: "4:22",
    youtubeId: "fG7N1A8t_5c",
    albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Aaj tak Sharma ji yeh song sun ke rote hain... pucho mat kyu!"
  },
  {
    id: "4",
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle & Mohammad Rafi",
    movie: "Yaadon Ki Baaraat",
    year: "1973",
    duration: "4:48",
    youtubeId: "89_3DgW_7mk",
    albumCover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Woh glass ki sound jab R.D. Burman sahab ne banayi thi... eternal vibe!"
  },
  {
    id: "5",
    title: "O Mere Dil Ke Chain",
    artist: "Kishore Kumar",
    movie: "Mere Jeevan Saathi",
    year: "1972",
    duration: "4:34",
    youtubeId: "W7oM-mU7J0E",
    albumCover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Kishore Da ka yeh track matlab sidhe dil me utar jata hai beta!"
  },
  {
    id: "6",
    title: "Lag Ja Gale Se Phir",
    artist: "Lata Mangeshkar",
    movie: "Woh Kaun Thi?",
    year: "1964",
    duration: "4:15",
    youtubeId: "TFr6G5zveS8",
    albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Lata ji ki aawaz suno, sukoon dekho salone me..."
  },
  {
    id: "7",
    title: "Pehla Nasha Pehla Khumaar",
    artist: "Udit Narayan & Sadhana Sargam",
    movie: "Jo Jeeta Wohi Sikandar",
    year: "1992",
    duration: "4:50",
    youtubeId: "I_fWv3U0o28",
    albumCover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "90s ki aashiqui ka national anthem tha yeh!"
  },
  {
    id: "8",
    title: "Roop Tera Mastana",
    artist: "Kishore Kumar",
    movie: "Aradhana",
    year: "1969",
    duration: "3:45",
    youtubeId: "HenA-OUyp0s",
    albumCover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Single take camera shot tha is song me... Rajesh Khanna sahab ka kya tashan tha!"
  },
  {
    id: "9",
    title: "Ye Shaam Mastani",
    artist: "Kishore Kumar",
    movie: "Kati Patang",
    year: "1971",
    duration: "4:02",
    youtubeId: "_sZg4Eub32U",
    albumCover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Chai ka cup pakdo aur shaam ka maza lo. Chacha vibes only!"
  },
  {
    id: "10",
    title: "Likhe Jo Khat Tujhe",
    artist: "Mohammed Rafi",
    movie: "Kanyadaan",
    year: "1968",
    duration: "4:32",
    youtubeId: "R3u4nU6PTo8",
    albumCover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
    chachaCommentary: "Pehle zamane me khat likhte the... ab toh WhatsApp pe ek line bhej dete hain log!"
  }
];

export const NOSTALGIC_QUOTES = [
  "Bhaiya, piche se chote mat karna... bas thode set kar do!",
  "Ye wala hairstyle toh Mithun Da jaisa jamega tumpe beta! - Chacha Ji",
  "Arre Sharma ji, thoda sar seedha rakho... kaan ke paas scissors chal rahi hai!",
  "Aagaya radio pe Kishore Kumar special... Radio thoda fast karo ramu!",
  "Aaj Cash, Kal Udhaar! Purani dosti me udhaar nahi chalta sahab.",
  "Garmi kitni badh gayi hai na? Panka fast kar beta piche ka...",
  "Ek garam adrak wali chai ho jaye malish se pehle? Ramu chai lao!",
  "Zero machine mat marwao side se, mummy ghar ghusne nahi degi!",
  "Kripya Rajnigandha khakar darpan pe na thukein.",
  "Chacha Ji ki advice: Baal toh dubara ug jayenge, izzat dubara nahi aati!",
  "Navratna oil ki maalis karwa lo, dimaag ki saari garmi nikal jayegi!",
  "Full AC Salone! (Light hone par pankha chalu karenge)",
  "Arre bhaizaan, Mithun style ka cut chahiye ya Bachchan sahab jaisa side partition?"
];

export const PRICE_LIST = [
  { item: "Gentlemen Hair Cut", price: "₹40" },
  { item: "Child Special Cut (Rote Hue)", price: "₹30" },
  { item: "Royal Shave + Cream", price: "₹25" },
  { item: "Navratna Head Massage (15 min)", price: "₹30" },
  { item: "Moustache Styling (Mooch Set)", price: "₹15" },
  { item: "Chacha Special VVIP Combo", price: "₹99" }
];

export const CHACHA_ADVICES = [
  "Har hafte ek baar thanda tel lagao, saara stress bahar!",
  "Baal pakne lagenge toh hair color mat lagana, mehendi natural lagana!",
  "Shave hamesha warm towel ke baad karo, cut nahi lagega.",
  "Log toh kehte rahenge, tum Kishore Da ka song suno aur mast raho!",
  "Life me do chize hamesha teekh honi chahiye: Ek mooch aur doosra character!",
  "Gussa aaye toh dimaag pe paanch minute Navratna oil se massage karo."
];
