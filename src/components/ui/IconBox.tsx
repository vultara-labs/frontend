"use client";

import { ElementType, ComponentType, ReactNode } from "react";

interface IconBoxProps {
    /** Phosphor Icon Component or generic React Icon */
    icon: ElementType | ComponentType<any>;
    /** Dynamic color string (hex, rgb, or var) */
    color?: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "glass" | "solid";
    iconWeight?: "bold" | "duotone" | "fill" | "regular";
}

export function IconBox({
    icon: Icon,
    color = "var(--volt)",
    className = "",
    size = "md",
    variant = "glass",
    iconWeight = "duotone"
}: IconBoxProps) {
    const sizeClasses = {
        sm: "w-8 h-8 rounded-lg",     // Widget small
        md: "w-10 h-10 rounded-xl",   // Widget default
        lg: "w-12 h-12 rounded-xl",   // Dashboard Cards
        xl: "w-16 h-16 rounded-2xl"   // Hero / Modal Header
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32
    };

    // Style Calculation:
    // Using color-mix for automatic opacity variants based on the input color
    // This allows us to pass 'var(--text-secondary)' or '#ff0000' and get standard glassmorphism
    const style = variant === "glass" ? {
        backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 20%, transparent)`,
        color: color
    } : {
        backgroundColor: color,
        borderColor: color,
        color: "#000" // Solid variant usually fits best with black icon
    };

    return (
        <div
            className={`${sizeClasses[size]} border flex items-center justify-center flex-shrink-0 ${className}`}
            style={style}
        >
            <Icon size={iconSizes[size]} weight={iconWeight} />
        </div>
    );
}
