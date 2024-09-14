"use client";

import React, { useEffect, useRef } from "react";
import { NavigateFunction, useLocation, useSearchParams } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { Stack, Label } from "../common/customs";
import { useMsal } from "@azure/msal-react";
import { useSetupMicrosoftUser } from "../../hooks/user-queries";

type MainLayoutProps = {
    children?: React.ReactNode,
    navigate: NavigateFunction
};

const MainLayout = ({ children, navigate }: MainLayoutProps) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(location.search);
    const { instance, accounts } = useMsal();
    const mainContentRef = useRef(null);

    const setupMicrosoftUser = useSetupMicrosoftUser();

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

    return (
        <>
            <header className="py-3">
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
                        marginLeft: "3rem"
                    }}
                    justify="space-between"
                >
                    <Link href="#" underline="none">
                        <Label color="black" showPointer>TaskWork</Label>
                    </Link>

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