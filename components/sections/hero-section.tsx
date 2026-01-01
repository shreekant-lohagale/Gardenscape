"use client";
import Image from "next/image";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { PlantButton } from "@/components/ui/plant-button";
import { ArrowRight, Phone, Star } from "lucide-react";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    isMobile?: boolean;
    priority?: boolean;
}

// --- FlipCard Component ---
const IMG_WIDTH = 100;
const IMG_HEIGHT = 140;

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
    isMobile,
    priority = false,
}: FlipCardProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={prefersReducedMotion ? { duration: 0 } : {
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group will-change-transform"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={!isMobile ? { rotateY: 180 } : undefined}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="absolute inset-0 h-full w-full">
                        <Image
                            src={src}
                            alt={`hero-${index}`}
                            fill
                            sizes="(max-width: 768px) 100px, 150px"
                            className="object-cover"
                            priority={priority}
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-lg bg-green-900 flex flex-col items-center justify-center p-4 border border-green-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-green-400 uppercase tracking-widest mb-1">View</p>
                        <p className="text-xs font-medium text-white">Project</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;

// Gardening / Nature Images
// Gardening / Nature Images (Curated & Stable)
const IMAGES = [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&q=80", // Garden care
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=300&q=80", // Planter
    "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=300&q=80", // Greenery
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&q=80", // Grass texture replacement
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=300&q=80", // Flower close up
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&q=80", // Garden wide
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80", // Indoor plant
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80", // Leaf detail
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80", // Landscape
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80", // Water/Nature
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80", // Forest
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80", // Mist
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&q=80", // Garden repeated
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&q=80", // Bloom
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=300&q=80", // Flower
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=300&q=80", // Planter
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&q=80", // Greenery
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&q=80", // Grass
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&q=80", // Garden
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80", // Nature
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// --- Hero Background Video Component ---
const HeroBackgroundVideo = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Desktop video */}
            <video
                className="hidden md:block absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/video/desktop.mp4" type="video/mp4" />
            </video>

            {/* Mobile video */}
            <video
                className="block md:hidden absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/video/mobile.mp4" type="video/mp4" />
            </video>

            {/* Optional overlay for contrast */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>
    );
};

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // --- Container Size ---
    useEffect(() => {
        const handleResize = () => {
            setContainerSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Native Scroll Logic (Framer Motion) ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1. Force Circle Phase on Scroll (User Polish)
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            if (latest > 0.05 && introPhase !== "circle") {
                setIntroPhase("circle");
            }
        });
    }, [scrollYProgress, introPhase]);

    // 2. Morph Progress: Circle -> Arc (Main Morph)
    const morphProgress = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 3. Scroll Rotation: [0.45, 0.75]
    const scrollRotate = useTransform(scrollYProgress, [0.45, 0.75], [0, 360]);
    const effectiveRotate = prefersReducedMotion ? useMotionValue(0) : scrollRotate;
    const smoothScrollRotate = useSpring(effectiveRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        if (prefersReducedMotion) {
            mouseX.set(0);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, scrollYProgress]);

    // --- Intro Sequence ---
    useEffect(() => {
        // Only run timers if we haven't already forced circle via scroll
        if (introPhase === 'circle') return;

        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, [introPhase]);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const titleOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0.25, 0.4], [0, -40]);
    const glassOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
    const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.7, 0.9], [30, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
            {/* Sticky Container */}
            <section
                aria-label="Gardenscape introduction"
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center perspective-1000 overflow-hidden"
            >
                {/* Background Video */}
                <HeroBackgroundVideo />
                {/* Intro Text (Fades out) */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute z-10 flex flex-col items-center justify-center text-center top-1/2 -translate-y-1/2 pointer-events-none"
                >
                    <div className="absolute inset-0 bg-green-400/20 blur-[90px] rounded-full scale-150 -z-10" />
                    <h1 aria-hidden="true" className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        GARDENSCAPE
                    </h1>
                    <div className="flex flex-col items-center">
                        <p className="text-sm md:text-base font-semibold tracking-[0.3em] text-green-50 uppercase mb-4 drop-shadow-md">
                            Transforming Spaces Into Green Havens
                        </p>
                        <p className="text-white mb-8 max-w-md mx-auto text-sm md:text-base font-medium drop-shadow-md">
                            Professional gardening & landscaping services for your home and office.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto w-full sm:w-auto px-4 sm:px-0">
                            <a href="#contact" className="w-full sm:w-auto">
                                <PlantButton text="Book a Free Visit" className="shadow-xl hover:scale-105 transition-transform duration-300" />
                            </a>
                            <a href="tel:+918459197397" className="w-full sm:w-auto">
                                <Button variant="outline" className="border-green-800 text-green-900 hover:bg-green-50 rounded-full px-8 py-6 text-base font-semibold border-2 hover:scale-105 transition-transform duration-300">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Now
                                </Button>
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-2 opacity-80 animate-fade-in">
                            <div className="flex -space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm font-medium text-white/90 drop-shadow-sm">
                                <span className="font-bold text-white">500+</span> gardens transformed
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    style={{ opacity: titleOpacity }}
                    className="absolute bottom-12 z-20 flex flex-col items-center gap-2 pointer-events-none"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Scroll Down</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-9 rounded-full border-2 border-white/30 flex justify-center p-1 backdrop-blur-sm"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-1.5 rounded-full bg-white"
                        />
                    </motion.div>
                </motion.div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-green-900 tracking-tight mb-4">
                        Discover Your Sanctuary
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
                        Expert landscaping, sustainable gardening, and modern design. <br className="hidden md:block" />
                        Scroll to explore our diverse portfolio of nature-inspired projects.
                    </p>
                </motion.div>

                {/* Animation Cards */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, isMobile ? 12 : TOTAL_IMAGES).map((src, i) => {
                        const activeTotal = isMobile ? 12 : TOTAL_IMAGES;
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const width = containerSize.width || (typeof window !== 'undefined' ? window.innerWidth : 1000);
                            const height = containerSize.height || (typeof window !== 'undefined' ? window.innerHeight : 800);
                            const isMobile = width < 768;
                            const minDimension = Math.min(width, height);

                            const circleRadius = Math.min(minDimension * 0.3, 320);
                            const circleAngle = (i / activeTotal) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(width, height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (activeTotal - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={activeTotal}
                                phase={introPhase}
                                target={target}
                                isMobile={isMobile}
                                priority={i < 3}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
