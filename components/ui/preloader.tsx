"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbitLoader } from "./orbit-loader";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Force a minimum load time for the "premium" feel, or wait for document load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5s intro

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] grid place-items-center bg-[#f8fbfa]"
                >
                    <div className="flex flex-col items-center gap-4">
                        <OrbitLoader size={50} color="#166534" />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-green-800 font-medium tracking-widest text-sm uppercase"
                        >
                            Loading Gardenscape
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
