"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "./Icons";

/**
 * Subtle sticky consultation bar for small screens only. Appears after the
 * hero scrolls away and hides once the consultation section is reached, so it
 * never competes with the primary CTA. Fits the reference's minimalist feel.
 */
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const consultation = document.getElementById("consultation");
      const nearEnd = consultation
        ? consultation.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setShow(y > window.innerHeight * 0.8 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-40 sm:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#consultation"
            className="flex items-center justify-between rounded-pill bg-accent px-6 py-3.5 text-accent-fg shadow-lift"
          >
            <span className="text-sm font-medium">Book a free consultation</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
