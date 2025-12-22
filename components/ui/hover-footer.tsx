"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";

export const TextHoverEffect = ({
    text,
    duration,
    className,
}: {
    text: string;
    duration?: number;
    automatic?: boolean;
    className?: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 600 200"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                if (svgRef.current) {
                    const svgRect = svgRef.current.getBoundingClientRect();
                    const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
                    const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
                    setMaskPosition({
                        cx: `${cxPercentage}%`,
                        cy: `${cyPercentage}%`,
                    });
                }
            }}
            className={cn("select-none uppercase cursor-pointer", className)}
        >
            <defs>
                <radialGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="25%" stopColor="#16a34a" />
                            <stop offset="50%" stopColor="#15803d" />
                            <stop offset="75%" stopColor="#166534" />
                            <stop offset="100%" stopColor="#14532d" />
                        </>
                    )}
                </radialGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={maskPosition}
                    transition={{ duration: duration ?? 0, ease: "easeOut" }}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                <mask id="textMask">
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#revealMask)"
                    />
                </mask>
            </defs>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.5"
                className="fill-transparent stroke-neutral-500 font-[helvetica] text-7xl font-bold"
                style={{ opacity: hovered ? 1 : 0.5 }}
            >
                {text}
            </text>
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="fill-transparent stroke-[#16a34a] font-[helvetica] text-7xl font-bold 
        dark:stroke-[#16a34a]"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="0.3"
                mask="url(#textMask)"
                className="fill-transparent font-[helvetica] text-7xl font-bold"
            >
                {text}
            </text>
        </svg>
    );
};


export const FooterBackgroundGradient = () => {
    return (
        <div
            className="absolute inset-0 z-0"
            style={{
                background:
                    "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #16a34a33 100%)",
            }}
        />
    );
};

// --- Footer Component ---

function HoverFooter() {
    // Footer link data
    const footerLinks = [
        {
            title: "Services",
            links: [
                { label: "Garden Care", href: "#services" },
                { label: "Landscaping", href: "#services" },
                { label: "Irrigation", href: "#services" },
                { label: "Maintenance", href: "#services" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "#about" },
                { label: "Projects", href: "#gallery" },
                {
                    label: "Book Now",
                    href: "#contact",
                    pulse: true,
                },
            ],
        },
    ];

    // Contact info data
    const contactInfo = [
        {
            icon: <Mail size={18} className="text-[#16a34a]" />,
            text: "hello@gardenscape.com",
            href: "mailto:hello@gardenscape.com",
        },
        {
            icon: <Phone size={18} className="text-[#16a34a]" />,
            text: "+91 84591 97397",
            href: "tel:+918459197397",
        },
        {
            icon: <MapPin size={18} className="text-[#16a34a]" />,
            text: "Pune, India",
        },
    ];

    // Social media icons
    const socialLinks = [
        { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    ];

    // Scroll Animation
    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    // Mobile Check
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
    }, []);

    return (
        <motion.footer
            ref={footerRef}
            style={{ opacity, scale }}
            className="bg-black relative h-fit overflow-hidden text-neutral-200"
        >
            <div className="max-w-7xl mx-auto p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-secondary text-3xl font-extrabold">
                                ✿
                            </span>
                            <span className="text-white text-3xl font-bold">GARDENSCAPE</span>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-400">
                            Transforming your outdoor spaces into living sanctuaries. <br />
                            Expert gardening & landscaping services.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-lg font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <a
                                            href={link.href}
                                            className="hover:text-[#16a34a] transition-colors text-gray-400"
                                        >
                                            {link.label}
                                        </a>
                                        {link.pulse && (
                                            <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3 text-gray-400">
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="hover:text-[#16a34a] transition-colors"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="hover:text-[#16a34a] transition-colors">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-gray-800 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
                    {/* Social icons */}
                    <div className="flex space-x-6 text-gray-400">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 -m-2 hover:text-[#16a34a] transition-colors"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-center md:text-left text-gray-500">
                        &copy; {new Date().getFullYear()} Gardenscape. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Text hover effect - Desktop Only */}
            {!isMobile && (
                <div className="relative hidden lg:flex h-[26rem] overflow-hidden">
                    <TextHoverEffect text="GARDENSCAPE" className="z-50 pointer-events-auto" />
                </div>
            )}

            <FooterBackgroundGradient />
        </motion.footer>
    );
}

export default HoverFooter;
