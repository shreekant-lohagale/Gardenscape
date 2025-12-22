"use client";

import { motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassOverlayProps {
    opacity?: MotionValue<number> | number;
    className?: string;
}

export function GlassOverlay({ opacity = 1, className }: GlassOverlayProps) {
    return (
        <motion.div
            style={{ opacity }}
            className={cn(
                "pointer-events-none absolute inset-0 z-[5]",
                className
            )}
        >
            {/* Base Frosted Glass (with Safari fallback) */}
            <div
                className="
          absolute inset-0
          backdrop-blur-xl
          bg-white/10
          supports-[backdrop-filter]:bg-white/10
          bg-white/20
        "
            />

            {/* Subtle Edge Darkening (Contrast) */}
            <div className="absolute inset-0 bg-black/5" />

            {/* Soft Radial Focus (center bias) */}
            <div
                className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.25),rgba(255,255,255,0.05)_60%,transparent_80%)]
        "
            />

            {/* Subtle Noise (Use data URI to avoid missing file) */}
            <div
                className="
          absolute inset-0
          opacity-[0.035]
          mix-blend-overlay
        "
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </motion.div>
    );
}
