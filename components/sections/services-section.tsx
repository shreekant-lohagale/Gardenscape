"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "motion/react"
import { cn } from "@/lib/utils"
import { PlantButton } from "@/components/ui/plant-button"
import Image from "next/image"
import { PlantScene } from "@/components/animations/plant-scene"

// --- Interfaces ---

interface ServiceProps {
    title: string;
    desc: string;
    image: string;
    imageAlt?: string; // Added for SEO
    gridClass?: string;
    priority?: boolean;
}

// --- Data Definitions ---

const SERVICES: ServiceProps[] = [
    {
        title: "Garden Care",
        desc: "Keep your garden healthy, clean, and thriving year-round.",
        // Updated to reliable Unsplash IDs
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
        gridClass: "col-span-1 md:col-span-6 row-span-1 md:row-span-3",
        priority: true
    },
    {
        title: "Landscaping",
        desc: "Transform outdoor spaces into stunning green retreats.",
        image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=800&auto=format&fit=crop",
        gridClass: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    },
    {
        title: "Lawn Renovation",
        desc: "Revive dull lawns with fresh, even green growth.",
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800&auto=format&fit=crop",
        gridClass: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    },
    {
        title: "Trimming & Pruning",
        desc: "Clean, safe, and well-shaped greenery.",
        image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80&auto=format&fit=crop",
        gridClass: "col-span-1 md:col-span-2",
    }
];

const ADDITIONAL_SERVICES: ServiceProps[] = [
    {
        title: "Hardscaping",
        desc: "Patios, walkways, and stone features.",
        image: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Seasonal Color",
        desc: "Vibrant flower rotations for every season.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Vibrant seasonal flower garden rotation",
    },
    {
        title: "Commercial Care",
        desc: "Professional groundskeeping for businesses.",
        image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=800&auto=format&fit=crop",
    }
];

// --- Sub-Components ---

const ServiceCard = ({ title, desc, image, imageAlt, priority = false }: ServiceProps) => (
    <button
        type="button"
        className="group relative size-full appearance-none overflow-hidden rounded-2xl bg-stone-100 text-left transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/20 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        tabIndex={0}
    >
        <Image
            className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
        />
        {/* Enhanced Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

        {/* Visual Polish: Glass Inner Ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />

        <div className="absolute bottom-0 left-0 p-6 text-white transition-transform duration-300 group-hover:-translate-y-1">
            <h3 className="mb-1 text-xl font-bold md:text-2xl">{title}</h3>
            <p className="text-sm font-medium text-white/80 md:text-base leading-snug opacity-90 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                {desc}
            </p>
        </div>
    </button>
);

interface BentoCellProps {
    children: React.ReactNode;
    index: number;
    scrollYProgress: MotionValue<number>;
    className?: string;
}

const BentoCell = ({ children, index, scrollYProgress, className }: BentoCellProps) => {
    const stagger = Math.min(index * 0.05, 0.3);
    const scale = useTransform(scrollYProgress, [0.1 + stagger, 0.6], [0.95, 1]);
    const y = useTransform(scrollYProgress, [0.1 + stagger, 0.6], [20, 0]);
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            style={{ scale: prefersReduced ? 1 : scale, y: prefersReduced ? 0 : y }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- Main Component ---

export const ServicesSection = () => {
    const scrollRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"],
    });

    return (
        <section className="relative w-full bg-background px-4 py-24">
            {/* Background Polish */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay will-change-transform"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
            />

            {/* 3D Model Background */}
            <PlantScene className="absolute inset-0 z-0 opacity-60 pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-green-950 md:text-5xl">
                        Complete Gardening & Landscaping Solutions
                    </h2>
                    <p className="text-lg font-medium text-green-800/80">
                        From everyday care to complete outdoor transformations.
                    </p>
                </div>

                {/* Animated Bento Grid */}
                <div ref={scrollRef} className="relative h-[120vh] min-h-[600px] w-full">
                    <div className="sticky top-24 grid grid-cols-1 gap-4 md:grid-cols-8 md:grid-rows-3">
                        {SERVICES.map((service, i) => (
                            <BentoCell
                                key={service.title}
                                index={i}
                                scrollYProgress={scrollYProgress}
                                className={cn("min-h-[240px]", service.gridClass)}
                            >
                                <ServiceCard {...service} />
                            </BentoCell>
                        ))}
                    </div>
                </div>

                {/* Static Grid (Footer Services) */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {ADDITIONAL_SERVICES.map((service) => (
                        <div key={service.title} className="h-[200px]">
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-24 text-center">
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-green-800/70">
                            <span className="rounded-full bg-green-100 p-1 text-green-600">★</span>
                            Trusted by 100+ homeowners & premium societies
                        </p>
                    </div>
                    <PlantButton
                        text="Get a Free Garden Assessment"
                        className="px-10 py-7 text-xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-green-200"
                    />
                </div>
            </div>
        </section>
    );
};
