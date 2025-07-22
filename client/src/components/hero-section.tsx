import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EmailSignup } from "./email-signup";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use scrollY for parallax effect
  const parallaxOffset = scrollY * 0.5;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-200/30 to-gray-300/20 dark:via-gray-700/20 dark:to-gray-600/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/20"></div>
      </div>

      {/* Floating Animation Elements */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full glass"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full glass"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-3/4 w-3 h-3 rounded-full glass"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        {/* Tagline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-xl md:text-2xl opacity-90 mb-2">
            Fueling Creativity with Generative AI
          </p>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Create Everything.
          <br />
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Just with a Prompt.
          </span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          AI Image Editor, Text-to-Image, Text-to-Video, 3D Generation, and
          more—on one intelligent platform.
        </motion.p>

        {/* Email Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <EmailSignup variant="hero" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <ChevronDown className="h-8 w-8 opacity-60 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
