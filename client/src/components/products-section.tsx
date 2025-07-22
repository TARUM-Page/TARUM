import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Image, Brain, Video, ZoomIn, Box, Rocket } from "lucide-react";

const products = [
  {
    icon: Image,
    title: "AI Image Editor",
    description: "Prompt-based editing and retouching with advanced AI algorithms.",
  },
  {
    icon: Brain,
    title: "Text to Image",
    description: "Create high-fidelity renders from simple text descriptions.",
  },
  {
    icon: Video,
    title: "Text to Video",
    description: "Convert prompts into stylized motion clips and animations.",
  },
  {
    icon: ZoomIn,
    title: "Image Upscaling",
    description: "Enhance clarity with super-resolution AI technology.",
  },
  {
    icon: Box,
    title: "3D Generator",
    description: "Describe objects and get immersive 3D output instantly.",
  },
  {
    icon: Rocket,
    title: "More to Come",
    description: "Voice AI, scene generation, and advanced features coming soon.",
  },
];

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h3
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            All-in-One AI Creative Suite
          </motion.h3>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              className="group glass rounded-2xl p-8 hover:scale-105 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <product.icon className="h-10 w-10" />
              </div>
              <h4 className="text-2xl font-bold mb-4">{product.title}</h4>
              <p className="opacity-80 leading-relaxed">{product.description}</p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
