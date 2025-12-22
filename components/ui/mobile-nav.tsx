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
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:max-w-md"
                >
                    <div className="flex items-center justify-between md:justify-center md:gap-8 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-2xl transition-all duration-300">
                        {navItems.map((item) => {
                            const isActive = activeHash === item.href;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveHash(item.href)}
                                    className={cn(
                                        "flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors relative group",
                                        isActive ? "text-green-400" : "text-white/50 hover:text-white"
                                    )}
                                >
                                    <div className="relative">
                                        {item.icon}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-dot"
                                                className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"
                                            />
                                        )}
                                    </div>
                                    <span className="text-[10px] md:text-sm font-medium md:block hidden">{item.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
