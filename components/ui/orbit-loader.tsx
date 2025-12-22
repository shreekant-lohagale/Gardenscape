import React from "react";
import styles from "./orbit-loader.module.css";
import { cn } from "@/lib/utils";

interface OrbitLoaderProps {
    className?: string;
    color?: string;
    size?: number;
}

export const OrbitLoader = ({ className, color, size }: OrbitLoaderProps) => {
    return (
        <div className={cn(styles.container, className)}>
            <div
                className={styles["chaotic-orbit"]}
                style={{
                    // Robustly handle custom variables if needed, though mostly defined in CSS
                    // @ts-ignore
                    "--uib-color": color,
                    "--uib-size": size ? `${size}px` : undefined
                } as React.CSSProperties}
            />
        </div>
    );
};
