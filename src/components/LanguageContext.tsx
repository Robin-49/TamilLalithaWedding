import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ta";

interface Translations {
  [key: string]: { en: string; ta: string };
}

export const translations: Translations = {
  groomName: { en: "Tamilarasan", ta: "தமிழரசன்" },
  brideName: { en: "Lalitha", ta: "லலிதா" },
  togetherWithFamilies: { en: "Together with their families", ta: "அவர்களது குடும்பங்களுடன்" },
  scroll: { en: "Scroll", ta: "கீழே செல்க" },
  celebration: { en: "Celebration", ta: "கொண்டாட்டம்" },
  reception: { en: "Reception", ta: "வரவேற்பு" },
  date: { en: "Date", ta: "தேதி" },
  time: { en: "Time", ta: "நேரம்" },
  venue: { en: "Venue", ta: "இடம்" },
  saturday: { en: "Wednesday", ta: "புதன்கிழமை" },
  onwards: { en: "Onwards", ta: "முதல்" },
  receptionVenue: { en: "Uma Murugan Thirumana Maaligai (A/C)", ta: "உமா முருகன் திருமண மாளிகை (A/C)" },
  receptionAddress: { en: "Orikkai, Kanchipuram", ta: "ஓரிக்கை, காஞ்சிபுரம்" },
  receptionInvite: { en: "Join us for an evening of joy, music, and celebration as we begin our journey together.", ta: "எங்கள் பயணத்தைத் தொடங்கும் இந்த மகிழ்ச்சியான மாலையில் எங்களுடன் இணையுங்கள்." },
  sacredUnion: { en: "Sacred Union", ta: "புனித திருமணம்" },
  muhurtam: { en: "Muhurtam", ta: "முகூர்த்தம்" },
  muhurtamTime: { en: "Muhurtam Time", ta: "முகூர்த்த நேரம்" },
  shubhMuhurat: { en: "Shubh Muhurat", ta: "சுப முகூர்த்தம்" },
  sunday: { en: "Thursday · Aani Month", ta: "வியாழக்கிழமை · ஆனி மாதம்" },
  weddingVenue: { en: "Uma Murugan Thirumana Maaligai (A/C)", ta: "உமா முருகன் திருமண மாளிகை (A/C)" },
  weddingAddress: { en: "Orikkai, Kanchipuram", ta: "ஓரிக்கை, காஞ்சிபுரம்" },
  weddingQuote: { en: '"Two souls with but a single thought, two hearts that beat as one."', ta: '"ஒரே எண்ணத்துடன் இரு உயிர்கள், ஒன்றாய் துடிக்கும் இரு இதயங்கள்."' },
  moments: { en: "Moments", ta: "தருணங்கள்" },
  gallery: { en: "Gallery", ta: "படத்தொகுப்பு" },
  countdown: { en: "Counting Down To", ta: "திருமணத்திற்கு" },
  theWedding: { en: "The Wedding", ta: "எஞ்சிய நாட்கள்" },
  days: { en: "Days", ta: "நாட்கள்" },
  hours: { en: "Hours", ta: "மணி" },
  minutes: { en: "Minutes", ta: "நிமிடங்கள்" },
  seconds: { en: "Seconds", ta: "விநாடிகள்" },
  findUs: { en: "Find Us", ta: "எங்களைக் கண்டறியுங்கள்" },
  venueMap: { en: "Venue Map", ta: "இடம் வரைபடம்" },
  getInTouch: { en: "Get In Touch", ta: "தொடர்பு கொள்ளுங்கள்" },
  contact: { en: "Contact", ta: "தொடர்பு" },
  brideFamily: { en: "Bride's Family", ta: "மணப்பெண் குடும்பம்" },
  groomFamily: { en: "Groom's Family", ta: "மணமகன் குடும்பம்" },
  withLove: { en: "With love & blessings", ta: "அன்புடனும் ஆசியுடனும்" },
  families: { en: "The Velu & Kumar Families", ta: "வேலு & குமார் குடும்பங்கள்" },
  heroDate: { en: "June 4, 2026 · Kanchipuram", ta: "ஜூன் 4, 2026 · காஞ்சிபுரம்" },
  receptionDate: { en: "June 3, 2026", ta: "ஜூன் 3, 2026" },
  receptionTime: { en: "6:30 PM", ta: "மாலை 6:30" },
  muhurtamDate: { en: "June 4, 2026", ta: "ஜூன் 4, 2026" },
  muhurtamTiming: { en: "7:30 AM — 9:00 AM", ta: "காலை 7:30 — 9:00" },
  brideFatherName: { en: "Mr. Kumar", ta: "திரு. குமார்" },
  groomFatherName: { en: "Mr. Velu", ta: "திரு. வேலு" },
  footerNamesDate: { en: "Tamilarasan & Lalitha · June 2026", ta: "தமிழரசன் & லலிதா · ஜூன் 2026" },
  initials: { en: "T&L", ta: "த&ல" },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}>({ lang: "en", setLang: () => { }, t: (k) => k });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = (key: string) => translations[key]?.[lang] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
