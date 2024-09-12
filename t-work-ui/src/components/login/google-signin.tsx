"use client";

import { Button, Image } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../assets/icons/google-icon.svg";

const GoogleSignInButton = () => {
    const googleSignIn = useGoogleLogin({
        onSuccess: (result) => console.log(result),
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