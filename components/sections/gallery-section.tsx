"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

const projects = [
    {
        title: "Villa Landscape Redesign",
        category: "Complete Transformation",
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&auto=format&fit=crop&q=60",
        stats: "2,500 sq.ft | 3 Weeks"
    },
    {
        title: "Urban Terrace Garden",
        category: "Hardscaping & Planting",
        image: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?w=800&auto=format&fit=crop&q=60",
        stats: "Penthouse | Custom Pots"
    },
    {
        title: "Japanese Zen Garden",
        category: "Styling & Maintenance",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60",
        stats: "Stone Work | Minimalist"
    },
    {
        title: "Vertical Green Wall",
        category: "Commercial Install",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=60",
        stats: "Office Lobby | Auto-Irrigation"
    }
]

const GalleryCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    // Robust Mobile Check
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Tuned Spring Physics (Heavier feel)
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            // Enhanced Card Styling: Taller, Shadow Transition, Z-Index fix
            className="relative h-[450px] w-full rounded-3xl bg-stone-200 shadow-xl cursor-pointer group transition-all duration-500 hover:shadow-2xl md:hover:z-50 perspective-1000"
        >
            {/* Background Image with Parallax Zoom */}
            <div
                style={{ transform: "translateZ(0px)" }}
                className="absolute inset-0 size-full rounded-3xl overflow-hidden pointer-events-none"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Deeper Gradient for Visual Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Floating Content Layer */}
            <div
                style={{ transform: "translateZ(80px)" }} // Stronger pop-out effect
                className="absolute inset-0 flex flex-col justify-end p-8 text-white pointer-events-none"
            >
                <div>
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-400 mb-2 drop-shadow-md">
                        {project.category}
                    </span>
                    <h3 className="text-2xl font-bold leading-tight mb-3 drop-shadow-lg text-white">
                        {project.title}
                    </h3>
                    {/* Visual Polish: Glass Pill with Star */}
                    <div className="flex items-center gap-2 text-[10px] font-bold bg-white/10 backdrop-blur-xl border border-white/20 w-fit px-4 py-1.5 rounded-full shadow-inner transition-colors group-hover:bg-white/20">
                        <Star className="w-3 h-3 fill-green-400 text-green-400" />
                        <span className="tracking-wide">{project.stats}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function GallerySection() {
    return (
        <section className="relative w-full py-24 bg-white overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-green-950 mb-4 tracking-tight">
                        Work in Action
                    </h2>
                    <p className="text-lg font-medium text-green-900/60 max-w-xl mx-auto">
                        Real results from real gardens. We take pride in every detail.
                    </p>
                </div>

                {/* 3D Grid - Mobile: Carousel, Desktop: Grid */}
                <div className="relative">
                    {/* Mobile Carousel */}
                    <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-10 -mx-4 px-4 scrollbar-hide">
                        {projects.map((project, index) => (
                            <div key={index} className="snap-center shrink-0 w-[85vw]">
                                <GalleryCard project={project} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 perspective-2000">
                        {projects.map((project, index) => (
                            <GalleryCard key={index} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* Trust Footer with Infinite Marquee */}
                <div className="mt-20 border-t border-green-900/5 pt-12 overflow-hidden">
                    <p className="text-center text-sm md:text-base font-bold text-green-900/40 uppercase tracking-[0.3em] mb-8">
                        Trusted by top communities
                    </p>

                    <div className="relative flex overflow-hidden w-full mask-gradient-x">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white z-10"></div>

                        <motion.div
                            className="flex gap-16 md:gap-32 min-w-max pr-16 md:pr-32"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                        >
                            {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <span className="text-2xl md:text-3xl font-serif font-bold text-green-950/40 whitespace-nowrap">Emaar Hills</span>
                                    <span className="text-2xl md:text-3xl font-sans font-light tracking-widest text-green-950/40 uppercase border-b border-green-950/20 whitespace-nowrap">DLF Camellias</span>
                                    <span className="text-2xl md:text-3xl font-mono font-bold text-green-950/40 tracking-tighter whitespace-nowrap">Lodha Park</span>
                                    <span className="text-2xl md:text-3xl font-serif italic text-green-950/40 whitespace-nowrap">Prestige Golf</span>
                                    <span className="text-2xl md:text-3xl font-sans font-extrabold text-green-950/40 tracking-tight whitespace-nowrap">Hiranandani</span>
                                    <span className="text-2xl md:text-3xl font-serif font-medium text-green-950/40 uppercase tracking-widest whitespace-nowrap">Oberoi Realty</span>
                                </React.Fragment>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    )
}
