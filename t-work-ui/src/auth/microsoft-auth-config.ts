import { Configuration } from '@azure/msal-browser';

export const loginRequest = {
    scopes: ["User.Read"],
};

export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.VITE_TASKWORK_MICROSOFT_CLIENT_ID!,
        authority: process.env.VITE_TASKWORK_MICROSOFT_AUTH_URL!,
        redirectUri: "/?moa=true",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false, 
    },
    system: {
        pollIntervalMilliseconds: 0
    },
};