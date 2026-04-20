import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const TopBar = () => {
  const { t, lang, setLang } = useLanguage();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Logo - Initials */}
      <div className="flex items-center gap-1">
        <div className="w-10 h-10 rounded-full border border-blush/40 bg-card/40 backdrop-blur-sm flex items-center justify-center">
          <span className="font-heading text-sm text-foreground tracking-wide">{t("initials")}</span>
        </div>
      </div>

      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === "en" ? "ta" : "en")}
        className="px-3 py-1.5 rounded-full border border-blush/40 bg-card/40 backdrop-blur-sm text-xs tracking-[0.15em] uppercase font-body text-foreground hover:bg-card/60 transition-colors"
      >
        {lang === "en" ? "தமிழ்" : "ENG"}
      </button>
    </motion.header>
  );
};

export default TopBar;
