import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, CalendarPlus } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import celebrationBg from "@/assets/celebration-bg.png";

const MAPS_URL = "https://maps.app.goo.gl/DEPyvmmqpm2FdqoY7";
const VENUE_NAME = "Uma Murugan Thirumana Maaligai (A/C)";
const VENUE_ADDRESS = "Orikkai, Kanchipuram";

// Generates a .ics file blob URL and triggers download (works on iOS Safari)
const generateICS = (
  title: string,
  start: string, // "YYYYMMDDTHHmmss"
  end: string,
  description: string
): string => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TamilarasanLalithaWedding//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${VENUE_NAME}, ${VENUE_ADDRESS}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
};

// Google Calendar URL (works on Android and desktop)
const googleCalUrl = (
  title: string,
  start: string, // "YYYYMMDDTHHmmssZ" UTC
  end: string,
  details: string
) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`)}`;

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const handleAddToCalendar = (
  title: string,
  icsStart: string,
  icsEnd: string,
  gcalStart: string,
  gcalEnd: string,
  description: string
) => {
  if (isIOS()) {
    const url = generateICS(title, icsStart, icsEnd, description);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } else {
    window.open(googleCalUrl(title, gcalStart, gcalEnd, description), "_blank");
  }
};

const EventsSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-screen py-24 overflow-hidden flex flex-col justify-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={celebrationBg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px]" />
      </motion.div>

      {/* Section header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full mb-12 text-center">
        <motion.p className="text-xs tracking-[0.4em] uppercase text-plum font-body mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("celebration")}
        </motion.p>
        <motion.h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
          {t("muhurtam")} &amp; {t("reception")}
        </motion.h2>
        <motion.div className="w-20 h-px bg-primary/30 mx-auto"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
      </div>

      {/* Event cards */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 w-full">

        {/* Reception Card */}
        <motion.div
          className="bg-card/40 backdrop-blur-md border border-primary/20 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
          <p className="text-xs tracking-[0.3em] uppercase text-plum font-body text-center">{t("reception")}</p>

          <div className="space-y-5 text-center flex-1">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-1">{t("date")}</p>
              <p className="font-heading text-2xl text-foreground">{t("receptionDate")}</p>
              <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">{t("saturday")}</p>
            </div>
            <div className="w-10 h-px bg-border mx-auto" />
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-1">{t("time")}</p>
              <p className="font-heading text-2xl text-foreground">{t("receptionTime")} {t("onwards")}</p>
            </div>
            <div className="w-10 h-px bg-border mx-auto" />
            {/* Location */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-2">{t("venue")}</p>
              <p className="text-sm text-foreground font-body font-light leading-snug">{t("weddingVenue")}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{t("weddingAddress")}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-plum hover:text-plum/80 font-body uppercase tracking-wider transition-colors"
              >
                <MapPin className="w-3 h-3" /> {t("findUs")}
              </a>
            </div>
          </div>

          {/* Add to Calendar */}
          <button
            onClick={() =>
              handleAddToCalendar(
                "Tamilarasan & Lalitha — Reception",
                "20260603T130000", // 6:30 PM IST = 13:00 UTC
                "20260603T160000", // ~9:30 PM IST
                "20260603T130000Z",
                "20260603T160000Z",
                `Reception at ${VENUE_NAME}, ${VENUE_ADDRESS}`
              )
            }
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-plum/40 text-plum hover:bg-plum/10 text-xs tracking-[0.2em] uppercase font-body transition-colors font-medium"
          >
            <CalendarPlus className="w-4 h-4" />
            Add to Calendar
          </button>
        </motion.div>

        {/* Muhurtam / Wedding Card */}
        <motion.div
          className="bg-card/40 backdrop-blur-md border border-primary/20 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}>
          <p className="text-xs tracking-[0.3em] uppercase text-plum font-body text-center">{t("muhurtam")}</p>

          <div className="space-y-5 text-center flex-1">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-1">{t("date")}</p>
              <p className="font-heading text-2xl text-foreground">{t("muhurtamDate")}</p>
              <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">{t("sunday")}</p>
            </div>
            <div className="w-10 h-px bg-border mx-auto" />
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-1">{t("muhurtamTime")}</p>
              <p className="font-heading text-2xl text-foreground">{t("muhurtamTiming")}</p>
              <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">{t("shubhMuhurat")}</p>
            </div>
            <div className="w-10 h-px bg-border mx-auto" />
            {/* Location */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-2">{t("venue")}</p>
              <p className="text-sm text-foreground font-body font-light leading-snug">{t("weddingVenue")}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{t("weddingAddress")}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-plum hover:text-plum/80 font-body uppercase tracking-wider transition-colors"
              >
                <MapPin className="w-3 h-3" /> {t("findUs")}
              </a>
            </div>
          </div>

          {/* Add to Calendar */}
          <button
            onClick={() =>
              handleAddToCalendar(
                "Tamilarasan & Lalitha — Wedding Muhurtam",
                "20260604T020000", // 7:30 AM IST = 2:00 UTC
                "20260604T033000", // 9:00 AM IST = 3:30 UTC
                "20260604T020000Z",
                "20260604T033000Z",
                `Wedding Muhurtam at ${VENUE_NAME}, ${VENUE_ADDRESS}`
              )
            }
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-plum/40 text-plum hover:bg-plum/10 text-xs tracking-[0.2em] uppercase font-body transition-colors font-medium"
          >
            <CalendarPlus className="w-4 h-4" />
            Add to Calendar
          </button>
        </motion.div>
      </div>

      {/* Quote */}
      <motion.div className="relative z-10 text-center mt-14 px-6"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}>
        <p className="text-muted-foreground font-body font-light text-sm leading-relaxed italic max-w-md mx-auto">
          {t("weddingQuote")}
        </p>
      </motion.div>
    </section>
  );
};

export default EventsSection;
