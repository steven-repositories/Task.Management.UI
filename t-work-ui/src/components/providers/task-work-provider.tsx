"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextTehemesProvider } from "next-themes";
import { NavigateFunction } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MicrosoftOAuthProvider } from "./microsoft-oauth-provider";

type TaskWorkProviderProps = {
    children: React.ReactNode,
    navigate: NavigateFunction
};

const TaskWorkProvider = ({ children, navigate }: TaskWorkProviderProps) => {
    return (
        <NextUIProvider navigate={navigate}>
            <NextTehemesProvider
                attribute="class"
                defaultTheme="light"
                themes={["light", "dark", "modern", "grey"]}
            >
                <GoogleOAuthProvider clientId="853842984038-rip7hnq5324glrpdiltqecdic0quf432.apps.googleusercontent.com">
                    <MicrosoftOAuthProvider>
                        {children}
                    </MicrosoftOAuthProvider>
                </GoogleOAuthProvider>
            </NextTehemesProvider>
        </NextUIProvider>
    );
};

export default TaskWorkProvider;