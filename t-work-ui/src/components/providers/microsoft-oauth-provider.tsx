"use client";

import React from "react";
import { PublicClientApplication, EventType, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from '../../auth/microsoft-auth-config';
import { MsalProvider } from "@azure/msal-react";

type MicrosoftOauthProviderProps = {
    children: React.ReactNode
};

export const MicrosoftOAuthProvider = ({ children }: MicrosoftOauthProviderProps) => {
    const msalInstance = new PublicClientApplication(msalConfig);

    msalInstance.addEventCallback((event) => {
        const authenticationResult = event.payload as AuthenticationResult;
        const account = authenticationResult?.account;

        if (event.eventType === EventType.LOGIN_SUCCESS && Boolean(account)) {
            msalInstance.setActiveAccount(account);
        }
    });

    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
};