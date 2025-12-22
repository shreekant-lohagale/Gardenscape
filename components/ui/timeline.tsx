"use client";

import { motion, useTransform, useScroll, useSpring } from "motion/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    // 1. Updated Offset for precise pinning
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // 2. Tuned Physics (More responsive if stiffness is higher, but 40/20 is "luxurious")
    // User requested "heavier" feel in Gallery, but here maybe let's stick to the requested refinement or defaults.
    // User tip: "try stiffness: 100, damping: 30" for more responsiveness.
    // Let's go with the user's suggestion for a slightly snappier feel.
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const x = useTransform(smoothProgress, [0, 1], ["1%", "-75%"]);

    return (
        <div ref={targetRef} className="relative h-[300vh] bg-neutral-950">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Header Overlay */}
                <div className="absolute top-10 left-8 md:left-20 z-10 pointer-events-none mix-blend-difference">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter opacity-80 text-[#CFD1D0]">
                        Our Journey
                    </h2>
                    <p className="text-lg md:text-xl font-medium opacity-60 mt-2 text-[#CFD1D0]">
                        Growing continuously since 2022
                    </p>
                </div>

                {/* 3. Progress Bar */}
                <div className="absolute bottom-10 left-8 md:left-20 w-[200px] h-1 bg-neutral-800 rounded-full overflow-hidden z-20">
                    <motion.div
                        style={{ scaleX: smoothProgress }}
                        className="size-full bg-green-500 origin-left"
                    />
                </div>

                {/* Horizontal Film Strip */}
                <motion.div style={{ x }} className="flex gap-8 md:gap-20 px-8 md:px-20">
                    <div className="w-[10vw] flex-shrink-0" />
                    {data.map((item, index) => (
                        // 4. Responsive Sizing (min-h-[400px])
                        <div key={index} className="relative flex-shrink-0 w-[80vw] md:w-[60vw] h-[60vh] min-h-[400px] flex items-center justify-center">
                            <div className="relative w-full h-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden p-8 md:p-14 flex flex-col justify-end group shadow-2xl">
                                {/* 5. Background Text Accessibility (pointer-events-none) */}
                                <div className="absolute -top-10 -right-10 leading-none pointer-events-none select-none">
                                    <span className="text-[12rem] md:text-[20rem] font-bold text-neutral-800/30 transition-colors group-hover:text-green-900/20">
                                        {item.title}
                                    </span>
                                </div>

                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-mono text-sm mb-6">
                                        Year {item.title}
                                    </div>
                                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#CFD1D0]">
                                        {item.content}
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    ))}
                    <div className="w-[10vw] flex-shrink-0" />
                </motion.div>

                {/* 6. Visual Transition Gradient (Dark to Cream) */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#f2f0e9] pointer-events-none z-10" />
            </div>
        </div>
    );
};
