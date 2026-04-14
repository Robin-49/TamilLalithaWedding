import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Jasmine petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`jasmine-${i}`}
          className="absolute w-3 h-3 rounded-full bg-sand opacity-40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            y: [0, -20, 5, -15, 0],
            x: [0, 10, -5, 8, 0],
            rotate: [0, 45, -20, 30, 0],
            opacity: [0.2, 0.5, 0.3, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Leaf accents */}
      <motion.div
        className="absolute -left-8 top-1/4 w-24 h-40 opacity-10"
        style={{
          background: "linear-gradient(135deg, hsl(var(--sage)) 0%, transparent 100%)",
          borderRadius: "0 100% 100% 0",
        }}
        animate={{ rotate: [0, 3, -2, 0], y: [0, -10, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-8 top-2/3 w-24 h-40 opacity-10"
        style={{
          background: "linear-gradient(225deg, hsl(var(--sage)) 0%, transparent 100%)",
          borderRadius: "100% 0 0 100%",
        }}
        animate={{ rotate: [0, -3, 2, 0], y: [0, 10, -5, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default FloatingElements;
