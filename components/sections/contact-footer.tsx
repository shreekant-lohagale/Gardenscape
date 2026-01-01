"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { PlantButton } from "@/components/ui/plant-button";

// Refactored TextHoverEffect for Light Theme
export const TextHoverEffect = ({ text }: { text: string }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 800 250"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                if (svgRef.current) {
                    const { left, top, width, height } = svgRef.current.getBoundingClientRect();
                    setMaskPosition({
                        cx: `${((e.clientX - left) / width) * 100}%`,
                        cy: `${((e.clientY - top) / height) * 100}%`,
                    });
                }
            }}
            className="select-none uppercase cursor-default"
        >
            <defs>
                <radialGradient id="revealMask" r="20%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </radialGradient>
                <mask id="textMask">
                    <rect width="100%" height="100%" fill="url(#revealMask)" />
                </mask>
            </defs>
            <text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                className="fill-transparent stroke-green-900/10 font-black text-8xl"
            >
                {text}
            </text>
            <motion.text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                animate={maskPosition}
                className="fill-green-900 font-black text-8xl"
                style={{ maskImage: "url(#textMask)", WebkitMaskImage: "url(#textMask)" }}
            >
                {text}
            </motion.text>
        </svg>
    );
};

export default function ContactFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="relative w-full bg-[#f2f0e9] overflow-hidden pt-24 border-t border-green-900/5">
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Main CTA & Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black text-green-950 leading-[0.9] mb-8 tracking-tighter">
                            READY TO <br /> <span className="text-green-700">TRANSFORM</span> <br /> YOUR SPACE?
                        </h2>
                        <PlantButton text="Schedule a Consultation" className="px-10 py-8 text-xl shadow-2xl shadow-green-900/10" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:pt-4">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-green-900/40">Contact Info</h4>
                            <a href="mailto:hello@gardenscape.com" className="group flex items-center gap-3 text-lg font-bold text-green-900">
                                <div className="p-2 rounded-full bg-green-900/5 group-hover:bg-green-700 group-hover:text-white transition-all">
                                    <Mail size={20} />
                                </div>
                                hello@gardenscape.com
                            </a>
                            <a href="tel:+918459197397" className="group flex items-center gap-3 text-lg font-bold text-green-900">
                                <div className="p-2 rounded-full bg-green-900/5 group-hover:bg-green-700 group-hover:text-white transition-all">
                                    <Phone size={20} />
                                </div>
                                +91 84591 97397
                            </a>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-green-900/40">Location</h4>
                            <div className="flex items-start gap-3 text-lg font-bold text-green-900">
                                <div className="p-2 rounded-full bg-green-900/5">
                                    <MapPin size={20} />
                                </div>
                                Pune, Maharashtra <br /> India
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links & Brand Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-t border-green-900/10 pt-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl">✿</span>
                            <span className="font-black text-2xl tracking-tighter text-green-950">GARDENSCAPE</span>
                        </div>
                        <p className="text-green-900/60 font-medium leading-relaxed max-w-[240px]">
                            Crafting sustainable, premium outdoor sanctuaries since 2015.
                        </p>
                    </div>

                    {[
                        {
                            title: "Sitemap",
                            links: [
                                { label: "Services", href: "#services" },
                                { label: "Projects", href: "#gallery" },
                                { label: "About", href: "#about" },
                                { label: "Process", href: "#" }
                            ]
                        },
                        {
                            title: "Services",
                            links: [
                                { label: "Landscaping", href: "#services" },
                                { label: "Maintenance", href: "#services" },
                                { label: "Irrigation", href: "#services" },
                                { label: "Hardscaping", href: "#services" }
                            ]
                        },
                        {
                            title: "Social",
                            links: [
                                { label: "Instagram", href: "https://instagram.com" },
                                { label: "Facebook", href: "https://facebook.com" },
                                { label: "Twitter", href: "https://twitter.com" },
                                { label: "LinkedIn", href: "https://linkedin.com" }
                            ]
                        }
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className="font-bold text-green-950 mb-6">{col.title}</h4>
                            <ul className="space-y-3">
                                {col.links.map(link => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-green-900/60 font-semibold hover:text-green-700 flex items-center group">
                                            {link.label}
                                            <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Large Decorative Text Element */}
            <div className="w-full h-[200px] md:h-[300px] mt-12 overflow-hidden border-t border-green-900/5">
                <TextHoverEffect text="GARDENSCAPE" />
            </div>

            {/* Bottom Bar */}
            <div className="bg-green-950 py-8 text-green-100/40 text-sm font-bold tracking-widest text-center uppercase">
                © {currentYear} Gardenscape — All Rights Reserved.
            </div>
        </footer>
    );
}
