import { motion } from "framer-motion";
import { Volume2, VolumeX, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const WHATSAPP_NUMBER = "919677970480";
const WHATSAPP_MSG = encodeURIComponent("Hello! We'd love to know more about the wedding.");

const FixedButtons = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free Carnatic-style loop
    const audio = new Audio("/Mangalyam-Tantunanena.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            removeListeners();
          })
          .catch(() => { });
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
    };

    // Try autoplay first (some browsers allow if user has been to the site before)
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Fallback: wait for interaction
        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
        window.addEventListener("mousedown", handleInteraction);
      });

    return () => {
      audio.pause();
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  };

  return (
    <>
      {/* Music button - bottom left */}
      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full border border-blush/40 bg-card/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card/80 transition-colors shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label={isPlaying ? "Mute music" : "Unmute music"}
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
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
