import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

import tamil1 from "@/assets/gallery/tamil1.jpeg";
import tamil2 from "@/assets/gallery/tamil2.jpeg";
import tamil3 from "@/assets/gallery/tamil3.png";
import tamil4 from "@/assets/gallery/tamil4.png";
import tamil5 from "@/assets/gallery/tamil5.png";
import tamil6 from "@/assets/gallery/tamil6.jpeg";
import tamil7 from "@/assets/gallery/tamil7.png";
import tamil8 from "@/assets/gallery/tamil8.jpeg";
import tamil9 from "@/assets/gallery/tamil9.png";
import tamil10 from "@/assets/gallery/tamil10.png";
import tamil11 from "@/assets/gallery/tamil11.png";

const images = [
  tamil1, tamil2, tamil3, tamil4, tamil5,
  tamil6, tamil7, tamil8, tamil9, tamil10,
  tamil11,
];

const GallerySection = () => {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : 0);
  const next = () =>
    setLightboxIndex(i => i !== null ? (i + 1) % images.length : 0);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-14 px-6">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase text-terracotta font-body mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          {t("moments")}
        </motion.p>
        <motion.h2
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
        >
          {t("gallery")}
        </motion.h2>
        <motion.div
          className="w-16 h-px bg-primary/30 mx-auto"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}
        />
      </div>

      {/* Pinterest Masonry via CSS columns */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          style={{
            columnCount: "var(--col-count)" as any,
            columnGap: "1rem",
          }}
          className="[--col-count:2] sm:[--col-count:3] lg:[--col-count:4]"
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={src}
                alt={`Wedding photo ${i + 1}`}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
              >
                <div className="w-8 h-8 ml-auto rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={e => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={images[lightboxIndex]}
                alt={`Gallery photo ${lightboxIndex + 1}`}
                className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            <button
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={e => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`rounded-full transition-all duration-300 ${i === lightboxIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"
                    }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
