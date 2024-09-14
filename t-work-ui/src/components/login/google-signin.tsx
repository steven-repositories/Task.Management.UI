"use client";

import { Button, Image } from "@nextui-org/react";
import { useGoogleLogin, } from "@react-oauth/google";
import GoogleIcon from "../../assets/icons/google-icon.svg";
import { useNavigate } from "react-router-dom";
import { useSetupGoogleUser } from "../../hooks/user-queries";

const GoogleSignInButton = () => {
    const navigate = useNavigate();
    const setupGoogleUser = useSetupGoogleUser();

    const googleSignIn = useGoogleLogin({
        prompt: "select_account",
        onSuccess: (result) => {
            setupGoogleUser(result.access_token);
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error(error);
        }
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