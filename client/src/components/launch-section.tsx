import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { EmailSignup } from "./email-signup";

export function LaunchSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="launch" className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.h3
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          We're Almost Ready
        </motion.h3>
        <motion.p
          className="text-xl md:text-2xl opacity-80 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The first wave of users is coming. Want in?
        </motion.p>

        {/* Large Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <EmailSignup variant="launch" />
        </motion.div>


      </div>
    </section>
  );
}
