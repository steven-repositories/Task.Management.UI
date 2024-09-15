"use client";

import React, { useEffect, useRef } from "react";
import { NavigateFunction, useLocation, useSearchParams } from "react-router-dom";
import { Button, Link, Image } from "@nextui-org/react";
import { Stack, Label } from "../common/customs";
import { useMsal } from "@azure/msal-react";
import { useSetupMicrosoftUser, useUser } from "../../hooks/user-queries";
import TaskWorkIcon from "../../assets/icons/taskwork-icon.svg";

type MainLayoutProps = {
    children?: React.ReactNode,
    navigate: NavigateFunction
};

const MainLayout = ({ children, navigate }: MainLayoutProps) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(location.search);
    const { instance, accounts } = useMsal();
    const mainContentRef = useRef(null);

    const { data: user } = useUser();
    const { mutate: setupMicrosoftUser } = useSetupMicrosoftUser();

    useEffect(() => {
        const microsoftOAuthorized = searchParams.has("moa", "true");
        
        if (microsoftOAuthorized) {
            const microsoftUser = instance.getActiveAccount();
            setupMicrosoftUser(microsoftUser!);

            setTimeout(() => {
                searchParams.delete("moa");
                navigate("/dashboard");
            }, 500);
        }
    }, [Boolean(accounts.length)]);

    // useEffect(() => {
    //     const sessionedUser = sessionStorage.getItem(StorageKeys.USER_PROFILE);

    //     if (Boolean(sessionedUser)) {
    //         console.log(11111111111);
    //         console.log({ user });
    //     }
    // }, [sessionStorage]);

    return (
        <>
            <header 
                className="light bg-background py-3" 
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 999
                }}
            >
                {/* IF NOT SIGNED IN */}
                {/* <Stack 
                    style={{
                        marginRight: "10.5rem",
                        marginLeft: "10.5rem"
                    }}
                >
                    <Link href="#" underline="none">
                        <Label color="black" showPointer>TaskWork</Label>
                    </Link>
                </Stack> */}

                {/* IF SIGNED IN */}
                <Stack 
                    style={{
                        marginRight: "3rem",
                        marginLeft: "3rem",
                    }}
                    justify="space-between"
                >
                    <Button 
                        variant="light"
                        startContent={
                            <Image
                                width={15}
                                alt="TaskWork Logo"
                                src={TaskWorkIcon}
                            />
                        }
                        endContent={
                            <Label size="16px" color="black" showPointer>TaskWork</Label>
                        }
                        disableRipple
                        disableAnimation
                    />

                    {/* <Link href="#" underline="none">
                        <Label color="black" showPointer>TaskWork</Label>
                    </Link> */}

                    <Stack style={{ display: "none" }} />
                </Stack>
            </header>

            <main>
                <Stack>
                    {/* <Stack
                        style={{
                            width: "15%"
                        }}
                    >

                    </Stack> */}

                    <Stack
                        className="purple-dark bg-background"
                        ref={mainContentRef}
                        tabIndex="-1"
                        style={{
                            padding: "1.5rem"
                        }}
                        fullWidth
                    >
                        {children}
                    </Stack>
                </Stack>
            </main>
            
            <footer></footer>
        </>
    );
};

export default MainLayout;