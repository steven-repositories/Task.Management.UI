"use client";

import { LogLevel } from '@azure/msal-browser';

export const loginRequest = {
    scopes: [],
};

export const msalConfig = {
    auth: {
        clientId: 'd1ba17f3-9696-4de4-b45a-3fca386ec252',
        authority: 'https://login.microsoftonline.com/882fb33f-9cb4-4595-a7fd-a169d7379109/',
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};