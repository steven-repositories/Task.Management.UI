"use client";

import React from "react";
import { Button, Image } from "@nextui-org/react";
import MicrosoftIcon from "../../assets/icons/microsoft-icon.svg";
import { useMsal, UnauthenticatedTemplate, AuthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "../../auth/microsoft-auth-config";

const MicrosoftSignInButton = () => {
    const { instance } = useMsal();

    const microsoftSignIn = () => {
        instance.loginPopup({
            ...loginRequest,
            prompt: "create"
        })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    };

    const microsoftSignOut = () => {
        const activeAccount = instance.getActiveAccount();

        if (Boolean(activeAccount)) {
            instance.logoutPopup({
                postLogoutRedirectUri: "/"
            })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
        }
    };

    return (
        <>
            <AuthenticatedTemplate>
                    <Button
                    onPress={() => microsoftSignOut()}
                    style={{ 
                        width: "100%",
                        gap: "0.3rem"
                    }}
                    startContent={
                        <Image
                            width={15}
                            alt="Microsoft Logo"
                            src={MicrosoftIcon}
                        />
                    }
                >
                    Microsoft
                </Button>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Button
                    onPress={() => microsoftSignIn()}
                    style={{ 
                        width: "100%",
                        gap: "0.3rem"
                    }}
                    startContent={
                        <Image
                            width={15}
                            alt="Microsoft Logo"
                            src={MicrosoftIcon}
                        />
                    }
                >
                    Microsoft
                </Button>
            </UnauthenticatedTemplate>
        </>
    )
};

export default MicrosoftSignInButton;