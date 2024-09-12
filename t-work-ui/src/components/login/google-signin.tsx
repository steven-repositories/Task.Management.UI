"use client";

import { Button, Image } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../assets/icons/google-icon.svg";
import { GetGoogleUserInfo } from "../../integration/data-manager";
import { Keys } from "../../hooks/keys/query-keys";
import React, { Dispatch, SetStateAction } from "react";

type GoogleSignInButtonProps = {
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
}

const GoogleSignInButton = ({ setIsSignedIn }: GoogleSignInButtonProps) => {

    const googleSignIn = useGoogleLogin({
        onSuccess: async (result) => {
            sessionStorage.setItem(Keys.OAUTH_TOKEN, result.access_token);

            const user = await GetGoogleUserInfo();

            sessionStorage.setItem(Keys.USER_PROFILE, JSON.stringify(user));
            setIsSignedIn(true);
        },
        onError: (error) => console.error(error)
    });

    return (
        <Button
            onPress={() => googleSignIn()}
            style={{ 
                width: "100%",
                gap: "0.4rem"
            }}
            startContent={
                <Image
                    width={15}
                    alt="Google Logo"
                    src={GoogleIcon}
                />
            }
        >
            Google
        </Button>
    );
};

export default GoogleSignInButton;