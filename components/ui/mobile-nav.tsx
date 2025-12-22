"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Image as ImageIcon, Briefcase, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#hero", icon: <Home size={20} /> },
    { name: "Services", href: "#services", icon: <Briefcase size={20} /> },
    { name: "Work", href: "#gallery", icon: <ImageIcon size={20} /> },
    { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

export const MobileNav = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeHash, setActiveHash] = useState("#hero");
    const [isOpen, setIsOpen] = useState(false); // For expanded menu if needed, or simple tab bar

    // Show nav only after scrolling past Hero
    useEffect(() => {
        const handleScroll = () => {
            // Show after 500px or so
            setIsVisible(window.scrollY > 500);

            // Simple spy logic
            const sections = navItems.map(item => item.href.substring(1));
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveHash(`#${section}`);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-15 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:max-w-md"
                >
                    <nav className="relative flex items-center justify-between md:justify-center md:gap-8 rounded-full px-6 py-4 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.25)] transition-all duration-300">
                        {/* Glass inner highlight */}
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/30 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

                        {navItems.map((item) => {
                            const isActive = activeHash === item.href;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveHash(item.href)}
                                    className={cn(
                                        "flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors relative group px-2 py-1 rounded-full",
                                        isActive ? "text-white" : "text-white/60 hover:text-white"
                                    )}
                                >
                                    {/* Glass hover halo */}
                                    <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative z-10">
                                        {item.icon}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-dot"
                                                className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                                            />
                                        )}
                                    </div>
                                    <span className="text-[10px] md:text-sm font-medium md:block hidden relative z-10">{item.name}</span>
                                </a>
                            );
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
