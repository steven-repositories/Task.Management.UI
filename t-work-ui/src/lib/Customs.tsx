"use client";

import React, { forwardRef } from "react";

interface IStyles {
    style?: React.CSSProperties,
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit",
    direction?: "row" | "row-reverse" | "column" | "column-reverse",
    display?: "block" | "inline-block" | "flex" | "grid" | "inherit" | "initial",
    align?: "flex-start" | "flex-end" | "self-start" | "self-end" | "anchor-center" | "center" | "stretch",
    gap?: string,
};

type StackProps = {
    children?: React.ReactNode,
    className?: string,
    fullWidth?: boolean,
    tabIndex?: string
} & IStyles;

type LabelProps = {
    children: React.ReactNode,
    toolTip?: React.ReactNode,
    isFor?: string
    size?: string
    weight?: "inherit" | "lighter"| "normal" | "bold" | "bolder",
    color?: "black" | "white" | "grey",
    showPointer?: boolean
} & IStyles;

export const Stack = forwardRef(({ children, className, fullWidth, style, justify, direction, display, align, gap, tabIndex }: StackProps, ref) => {
    return (
        <div
            className={className} 
            tabIndex={(tabIndex ? +tabIndex : 0)}
            style={{
                justifyContent: (justify ?? "flex-start"),
                flexDirection: (direction ?? "row"),
                display: (display ?? "flex"),
                alignItems: (align ?? "center"),
                gap: (gap ?? "1.5rem"),
                width: (fullWidth ? "100%" : style?.width),
                margin: (style?.margin ?? "1px"),
                ...style
            }}
        >
            {children}
        </div>
    );
});

export const Label = ({ children, toolTip, isFor, size, weight, color, showPointer, style }: LabelProps) => {
    return (
        <label 
            htmlFor={isFor}
            style={{
                cursor: (showPointer ? "pointer" : "none"),
                fontSize: (size ?? "20px"),
                fontWeight: (weight ?? "initial"),
                color: color,
                ...style
            }}
        >
            <Stack align="center" direction="row" gap="1rem">
                {children}
                {toolTip}
            </Stack>
        </label>
    );
};