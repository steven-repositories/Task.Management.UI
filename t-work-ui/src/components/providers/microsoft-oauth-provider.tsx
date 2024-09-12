import React from "react";
import { PublicClientApplication, EventType, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from '../../auth/microsoft-auth-config';
import { MsalProvider } from "@azure/msal-react";

type MicrosoftOauthProviderProps = {
    children: React.ReactNode
};

export const MicrosoftOAuthProvider = ({ children }: MicrosoftOauthProviderProps) => {
    const msalInstance = new PublicClientApplication(msalConfig);

    // // Default to using the first account if no account is active on page load
    // if (!Boolean(msalInstance.getActiveAccount()) && Boolean(msalInstance.getAllAccounts().length)) {
    //     // Account selection logic is app dependent. Adjust as needed for different use cases.
    //     msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    // }

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