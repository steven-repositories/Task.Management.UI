"use client";

import { Stack, Label } from "../components/common/customs";
import { Card, CardHeader, CardBody, Image, Input, Button, CardFooter, Divider, Link } from "@nextui-org/react";
// import { useForm, Controller } from "react-hook-form";
import LinkedInIcon from "../assets/icons/linkedin-icon.svg";
import SlackIcon from "../assets/icons/slack-icon.svg";
import GoogleSignInButton from "../components/login/google-signin";
import MicrosoftSignInButton from "../components/login/microsoft-signin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StorageKeys } from "../keys/storage-keys";
import SignupCard from "../components/login/signup-card";

type CardPages = "signup" | "login" | "forgot-account";

const Main = () => {
    const [cardPage, setCardPage] = useState<CardPages>("signup");
    const [isInvalid, setIsInvalid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // if have value then 
        // user has been signed in
        // -> navigate to dashboard
        const userIdentity = sessionStorage.getItem(StorageKeys.USER_IDENTITY);

        if (Boolean(userIdentity)) {
            // navigate("/dashboard");
        }
    }, []);

    useEffect(() => {

    }, [cardPage]);

    return (
        <section 
            className="py-6" 
            style={{ 
                width: "100%",
                height: "100vh"
            }}
        >
            <Stack
                direction="row"
                fullWidth
            >
                <Stack
                    justify="flex-end"
                    align="flex-start"
                    fullWidth
                >
                    <Stack
                        style={{ width: "80%" }}
                        direction="column"
                    >
                        <Stack>
                            <Label weight="bolder" size="2.5rem" color="white">Streamlining Project Management with Elegance</Label>
                        </Stack>

                        <Stack>
                            <Label color="white">Streamline your teams, tasks, and projects into a unified workflow effortlessly in TaskWork</Label>
                        </Stack>

                        <Stack fullWidth direction="column">
                            <Image
                                isBlurred
                                width={240}
                                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                alt="NextUI Album Cover"
                                className="m-5"
                            />
                        </Stack>
                    </Stack>
                </Stack>

                <Stack 
                    justify="center"
                    direction="row"
                    fullWidth
                >
                    <Stack style={{ width: "80%" }}>
                        <Card
                            isBlurred
                            className="border-none border-radius bg-background/0 dark:bg-default-100/50"
                            shadow="lg"
                            style={{
                                height: "36.75rem",
                                width: "75%",
                                gap: "0.5rem",
                                paddingRight: "10px",
                                paddingLeft: "10px"
                            }}
                        >
                            {cardPage === "signup" && (
                                <SignupCard setIsInvalid={setIsInvalid} />
                            )}

                            {cardPage === "login" && (
                                <SignupCard setIsInvalid={setIsInvalid} />
                            )}
                            
                            {cardPage === "forgot-account" && (
                                <SignupCard setIsInvalid={setIsInvalid} />
                            )}
                            
                            <CardFooter style={{ marginBottom: "5px" }}>
                                <Stack 
                                    justify="center"
                                    direction="column" 
                                    gap="1.75rem"
                                    fullWidth
                                >
                                    <Label size="13px" color="grey">
                                    —————— Or continue with ——————
                                    </Label>

                                    <Stack 
                                        justify="space-evenly" 
                                        direction="column"
                                        gap="1rem"
                                        fullWidth
                                    >
                                        <Stack 
                                            justify="space-evenly" 
                                            fullWidth
                                        >
                                            <Stack fullWidth>
                                                <GoogleSignInButton />
                                            </Stack>

                                            <Stack fullWidth>
                                                <MicrosoftSignInButton />
                                            </Stack>
                                        </Stack>

                                        <Stack 
                                            justify="space-evenly" 
                                            fullWidth
                                        >
                                            <Stack fullWidth>
                                                <Button
                                                    style={{ 
                                                        width: "100%", 
                                                        gap: "0.2rem" 
                                                    }}
                                                    startContent={
                                                        <Image
                                                            width={20}
                                                            alt="LinkedIn Logo"
                                                            src={LinkedInIcon}
                                                        />
                                                    }
                                                >
                                                    LinkedIn
                                                </Button>
                                            </Stack>

                                            <Stack fullWidth>
                                                <Button
                                                    style={{ 
                                                        width: "100%",
                                                        gap: "0.3rem"
                                                    }}
                                                    startContent={
                                                        <Image
                                                            width={15}
                                                            alt="Slack Logo"
                                                            src={SlackIcon}
                                                        />
                                                    }
                                                >
                                                    Slack
                                                </Button>
                                            </Stack>
                                        </Stack>

                                        <Divider />

                                        {cardPage === "signup" && (
                                            <Link
                                                className="light"
                                                color="primary" 
                                                onPress={() => setCardPage("login")} 
                                            >
                                                <Label 
                                                    size="13px" 
                                                    showPointer
                                                >
                                                    Already have an account?
                                                </Label>
                                            </Link>
                                        )}

                                        {cardPage === "login" && (
                                            <Stack
                                                justify="center"
                                                style={{
                                                    margin: "0px"
                                                }}
                                                fullWidth
                                            >
                                                <Link
                                                    className="light"
                                                    color="primary" 
                                                    onPress={() => setCardPage("forgot-account")} 
                                                >
                                                    <Label 
                                                        size="13px" 
                                                        showPointer
                                                    >
                                                        Can't log in?
                                                    </Label>
                                                </Link>

                                                {/* <Divider orientation="vertical" style={{ height: "10px"}} /> */}

                                                <Label 
                                                    size="15px" 
                                                    color="grey"
                                                >
                                                    •
                                                </Label>

                                                <Link
                                                    className="light"
                                                    color="primary" 
                                                    onPress={() => setCardPage("signup")} 
                                                >
                                                    <Label 
                                                        size="13px" 
                                                        showPointer
                                                    >
                                                        Create account
                                                    </Label>
                                                </Link>
                                            </Stack>
                                        )}

                                        {cardPage === "forgot-account" && (
                                            <Link
                                                className="light"
                                                color="primary" 
                                                onPress={() => setCardPage("login")} 
                                            >
                                                <Label 
                                                    size="13px" 
                                                    showPointer
                                                >
                                                    Already have an account?
                                                </Label>
                                            </Link>
                                        )}
                                    </Stack>
                                </Stack>
                            </CardFooter>
                        </Card>
                    </Stack>
                </Stack>
            </Stack>
        </section>
    );
};

export default Main;