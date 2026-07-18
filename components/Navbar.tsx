"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { easePremium } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Button } from "./Button";
import { Close, Menu } from "./Icons";
import { Logo } from "./Logo";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between rounded-pill border px-4 py-2.5 transition-all duration-300 ease-premium sm:px-5",
            scrolled
              ? "border-line bg-bg/80 shadow-card backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <motion.a
            href="#top"
            aria-label={`${"Northbridge"} home`}
            className="shrink-0"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: easePremium }}
          >
            <Logo />
          </motion.a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.05, ease: easePremium }}
                >
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "whitespace-nowrap rounded-pill px-3.5 py-2 text-sm transition-all duration-300 ease-premium hover:bg-ink/[0.05] hover:text-ink",
                      isActive ? "text-ink" : "text-ink-muted"
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easePremium }}
          >
            <Button
              as="a"
              href="#consultation"
              size="md"
              className="hidden sm:inline-flex"
            >
              Book a consultation
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:bg-ink/5 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </motion.div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              className="absolute inset-x-3 top-3 rounded-card border border-line bg-bg p-5 shadow-lift"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:bg-ink/5"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-lg text-ink transition-colors hover:bg-ink/5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                as="a"
                href="#consultation"
                size="lg"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Book a consultation
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
