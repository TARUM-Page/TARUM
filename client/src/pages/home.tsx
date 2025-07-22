import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { VisionSection } from "@/components/vision-section";
import { ProductsSection } from "@/components/products-section";
import { LaunchSection } from "@/components/launch-section";

import { FooterSection } from "@/components/footer-section";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="text-2xl font-bold glass px-4 py-2 rounded-lg">TARUM</div>
            
            {/* Centered Navigation */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-12 rounded-full px-8 py-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm font-medium glass px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="text-sm font-medium glass px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("vision")}
                className="text-sm font-medium glass px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
              >
                Vision
              </button>
              <button
                onClick={() => scrollToSection("launch")}
                className="text-sm font-medium glass px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
              >
                Waitlist
              </button>
            </div>

            {/* Spacer for balance */}
            <div className="w-16"></div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg glass"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 glass rounded-lg p-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-left hover:opacity-75 transition-opacity"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-left hover:opacity-75 transition-opacity"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("vision")}
                  className="text-left hover:opacity-75 transition-opacity"
                >
                  Vision
                </button>
                <button
                  onClick={() => scrollToSection("launch")}
                  className="text-left hover:opacity-75 transition-opacity"
                >
                  Waitlist
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <HeroSection />
      <ProductsSection />
      <VisionSection />
      <LaunchSection />
      <FooterSection />
    </div>
  );
}
