"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextTehemesProvider } from "next-themes";
import { NavigateFunction } from "react-router-dom";

type TaskWorkProviderProps = {
    children: React.ReactNode,
    navigate: NavigateFunction
};

const TaskWorkProvider = ({ children, navigate } : TaskWorkProviderProps) => {
    return (
        <NextUIProvider navigate={navigate}>
            <NextTehemesProvider
                attribute="class"
                defaultTheme="light"
                themes={["light", "dark", "modern", "grey"]}
            >
                {children}
            </NextTehemesProvider>
        </NextUIProvider>
    );
};

export default TaskWorkProvider;