"use client";

import { Button, Image } from "@nextui-org/react";
import MicrosoftIcon from "../../assets/icons/microsoft-icon.svg";
import { useMsal, UnauthenticatedTemplate, AuthenticatedTemplate } from "@azure/msal-react";
import { useMicrosoftLogin } from "../../hooks/user-queries";

const MicrosoftSignInButton = () => {
    const { instance } = useMsal();

    const { mutate: microsoftSignIn } = useMicrosoftLogin({
        onSuccess: (result: unknown) => {
            console.log(result);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const microsoftSignOut = () => {
        const activeAccount = instance.getActiveAccount();

        if (Boolean(activeAccount)) {
            instance.logoutPopup({
                account: activeAccount
            });
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