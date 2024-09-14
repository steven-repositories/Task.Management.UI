"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextTehemesProvider } from "next-themes";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MicrosoftOAuthProvider } from "./microsoft-oauth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ClientRecordNames = "google-client" | "query-client";

type TaskWorkProviderProps = {
    children: React.ReactNode,
    clientRecords: Record<ClientRecordNames, object>
};

const TaskWorkProvider = ({ children, clientRecords }: TaskWorkProviderProps) => {
    const googleRecord = Object.entries(clientRecords["google-client"]);
    const googleClientId: string = googleRecord.at(0)?.[1]!;

    const queryClient = new QueryClient(clientRecords["query-client"]);

    return (
        <NextUIProvider>
            <NextTehemesProvider
                attribute="class"
                defaultTheme="light"
                themes={["light", "dark", "modern", "grey"]}
            >
                <QueryClientProvider client={queryClient}>
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <MicrosoftOAuthProvider>
                            {children}
                        </MicrosoftOAuthProvider>
                    </GoogleOAuthProvider>
                </QueryClientProvider>
            </NextTehemesProvider>
        </NextUIProvider>
    );
};

export default TaskWorkProvider;