import { motion } from "framer-motion";
import { Volume2, VolumeX, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const WHATSAPP_NUMBER = "919677970480";
const WHATSAPP_MSG = encodeURIComponent("Hello! We'd love to know more about the wedding.");

const FixedButtons = () => {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    // Create audio element with a royalty-free Carnatic-style loop
    const audio = new Audio("/Mangalyam-Tantunanena.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Autoplay on first user interaction
    const play = () => {
      audio.play().then(() => setAudioReady(true)).catch(() => { });
      document.removeEventListener("click", play);
      document.removeEventListener("scroll", play);
      document.removeEventListener("touchstart", play);
    };

    // Try autoplay first
    audio.play().then(() => setAudioReady(true)).catch(() => {
      document.addEventListener("click", play, { once: false });
      document.addEventListener("scroll", play, { once: false });
      document.addEventListener("touchstart", play, { once: false });
    });

    return () => {
      audio.pause();
      document.removeEventListener("click", play);
      document.removeEventListener("scroll", play);
      document.removeEventListener("touchstart", play);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.play().catch(() => { });
      audioRef.current.volume = 0.3;
    } else {
      audioRef.current.pause();
    }
    setMuted(!muted);
  };

  return (
    <>
      {/* Music button - bottom left */}
      <motion.button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full border border-blush/40 bg-card/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card/80 transition-colors shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      {/* WhatsApp button - bottom right */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20bd5a] transition-colors shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </motion.a>
    </>
  );
};

export default FixedButtons;
