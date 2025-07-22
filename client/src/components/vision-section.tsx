import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import comfyUIImage from "@assets/ComfyUI_00078_.png";

export function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h3
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Designed for the Future of Creation
          </motion.h3>
          <div className="max-w-4xl mx-auto">
            <motion.p
              className="text-lg md:text-xl opacity-80 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Tarum.ai, we envision a world where anyone can bring their imagination to life with Generative AI.
              Our mission is to empower creators, designers, and developers to generate, enhance, and animate content
              instantly—with no boundaries.
            </motion.p>
          </div>
        </div>

        {/* Minimalist Technology Workspace */}
        <motion.div
          className="relative rounded-3xl overflow-hidden glass"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src={comfyUIImage}
            alt="ComfyUI AI workflow interface showing the creative process"
            className="w-full h-96 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
