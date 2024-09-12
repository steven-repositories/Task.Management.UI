"use client";

import { Stack, Label } from "../lib/customs";
import { Card, CardHeader, CardBody, CardFooter, Image, Input, Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import MicrosoftIcon from "../assets/icons/microsoft-icon.svg";
import LinkedInIcon from "../assets/icons/linkedin-icon.svg";
import SlackIcon from "../assets/icons/slack-icon.svg";
import axios from "axios";

import GoogleSignInButton from "../components/login/google-signin";
import MicrosoftSignInButton from "../components/login/microsoft-signin";

const Login = () => {
    return (
        <section 
            className="py-6" 
            style={{ 
                width: "100%"
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
                                height: "32rem",
                                width: "70%",
                                gap: "0.5rem",
                                paddingRight: "10px",
                                paddingLeft: "10px"
                            }}
                        >
                            <CardHeader
                                style={{
                                    marginTop: "15px",
                                    gap: "1.5rem",
                                    justifyContent: "center"
                                }} 
                            >
                                <Stack direction="column" gap="0.3rem">
                                    <Label size="25px" weight="bold">Get Started</Label>
                                    <Label size="15px">Free for all users — no subscription needed!</Label>
                                </Stack>
                            </CardHeader>

                            <CardBody>
                                <Stack 
                                    align="flex-start"
                                    direction="column"
                                >
                                    <Stack 
                                        align="flex-start" 
                                        direction="column" 
                                        gap="1rem"
                                        fullWidth
                                    >
                                        <Stack fullWidth>
                                            <Input
                                                type="email" 
                                                label="Work email" 
                                                placeholder="Enter your work email"
                                            />
                                        </Stack>

                                        <Stack fullWidth>
                                            <Label color="grey" size="10.5px">
                                                I agree to the TaskWork Customer Agreement, 
                                                which incorporates by reference the AI Product-Specific Terms, 
                                                and acknowledge the Privacy Policy.</Label>
                                        </Stack>

                                        <Stack justify="center" fullWidth>
                                            <Button
                                                radius="lg"
                                                style={{ 
                                                    width: "100%" 
                                                }}
                                            >
                                                Sign up
                                            </Button>
                                        </Stack>
                                    </Stack>

                                    <Stack 
                                        justify="center"
                                        direction="column" 
                                        fullWidth
                                    >
                                        <Label size="15px" color="grey">
                                            ———— Or continue with ————
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
                                        </Stack>
                                    </Stack>
                                </Stack>


                                {/* <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4">
                                        <Image
                                            alt="Album cover"
                                            className="object-cover"
                                            height={200}
                                            shadow="md"
                                            src="https://nextui.org/images/album-cover.png"
                                            width="100%"
                                        />
                                    </div>
                                </div> */}
                            </CardBody>
                            
                        </Card>
                    </Stack>
                </Stack>
            </Stack>
        </section>
    );
};

export default Login;