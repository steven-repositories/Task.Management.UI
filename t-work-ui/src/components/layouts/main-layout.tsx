"use client";

import React, { useRef } from "react";
import TaskWorkProvider from "../providers/task-work-provider";
import { useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { Stack, Label } from "../common/customs";

type MainLayoutProps = {
    children?: React.ReactNode
};

const MainLayout = ({ children }: MainLayoutProps) => {
    const mainContentRef = useRef(null);
    const navigate = useNavigate();

    return (
        <TaskWorkProvider navigate={navigate}>
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
        </TaskWorkProvider>
    );
};

export default MainLayout;