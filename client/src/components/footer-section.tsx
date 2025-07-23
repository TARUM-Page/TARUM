import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer className="py-16 border-t glass" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h4 className="text-2xl font-bold mb-4">Tarum.ai</h4>
            <p className="opacity-80 mb-6 max-w-md">
              Fueling Creativity with Generative AI. The future of content creation is here.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <p className="opacity-80 text-sm">admin@tarum.ai</p>
          </div>


        </motion.div>

        <motion.div
          className="mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="opacity-60 text-sm">© 2025 Tarum.ai. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
