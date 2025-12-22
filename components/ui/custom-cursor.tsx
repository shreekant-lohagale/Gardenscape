"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isNavHovered, setIsNavHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const stickyX = useMotionValue(0);
    const stickyY = useMotionValue(0);
    const magneticAmount = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 28, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const finalX = useTransform([smoothX, stickyX, magneticAmount], ([raw, sticky, amt]) =>
        (raw as number) * (1 - (amt as number)) + (sticky as number) * (amt as number)
    );
    const finalY = useTransform([smoothY, stickyY, magneticAmount], ([raw, sticky, amt]) =>
        (raw as number) * (1 - (amt as number)) + (sticky as number) * (amt as number)
    );

    useEffect(() => {
        if (typeof window === "undefined" || "ontouchstart" in window) return;

        const move = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            mouseX.set(x);
            mouseY.set(y);
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            const navElement = target.closest("nav");
            setIsNavHovered(!!navElement);

            const trigger = target.closest("a, button, .magnetic-trigger");

            if (trigger && !navElement) {
                const rect = trigger.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.hypot(x - centerX, y - centerY);
                const threshold = 60;

                if (distance < threshold) {
                    stickyX.set(centerX);
                    stickyY.set(centerY);
                    magneticAmount.set(1);
                    setIsHovering(true);
                } else {
                    magneticAmount.set(0);
                    setIsHovering(false);
                }
            } else {
                magneticAmount.set(0);
                setIsHovering(false);
            }
        };

        const handleDown = () => setIsClicked(true);
        const handleUp = () => setIsClicked(false);

        window.addEventListener("mousemove", move, { passive: true });
        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* Outer Ring / Precision Ring for Nav */}
            <motion.div
                style={{
                    x: finalX,
                    y: finalY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="absolute top-0 left-0 will-change-transform"
            >
                <motion.div
                    animate={{
                        // Transform into a small precision ring when in Nav
                        scale: isNavHovered ? 0.4 : (isClicked ? 0.6 : (isHovering ? 1.4 : 1)),
                        width: 48,
                        height: 48,
                        opacity: 1,
                        backgroundColor: isNavHovered ? "transparent" : (isHovering ? "#033016" : "#ffffff"),
                        borderColor: isNavHovered ? "#033016" : (isHovering ? "#ffffff" : "#033016"),
                        borderWidth: isNavHovered ? "4px" : "2px", // Thicker border for the small ring
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    className="rounded-full shadow-xl"
                />
            </motion.div>

            {/* Inner Dot - Hidden during Nav Hover */}
            <motion.div
                className="absolute top-0 left-0 mix-blend-normal"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: isNavHovered ? 0 : (isClicked ? 1.5 : (isHovering ? 0 : 1)),
                        opacity: isNavHovered ? 0 : 1,
                        backgroundColor: isHovering ? "#ffffff" : "#033016",
                    }}
                    className="w-2 h-2 rounded-full"
                />
            </motion.div>
        </div>
    );
};
