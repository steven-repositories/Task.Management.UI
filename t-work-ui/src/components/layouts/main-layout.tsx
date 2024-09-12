"use client";

import React, { useRef } from "react";
import TaskWorkProvider from "../providers/task-work-provider";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { Stack, Label } from "../../lib/customs";

type MainLayoutProps = {
    children?: React.ReactNode
};

const MainLayout = ({ children }: MainLayoutProps) => {
    const mainContentRef = useRef(null);
    const navigate = useNavigate();

    return (
        <TaskWorkProvider navigate={navigate}>
            <header className="py-3">
                <Stack
                    style={{
                        marginRight: "10.5rem",
                        marginLeft: "10.5rem"
                    }}
                >
                    <Stack>
                        <Link href="#" underline="none">
                            <Label color="black" size="23px" showPointer>TaskWork</Label>
                        </Link>
                    </Stack>
                </Stack>
            </header>

            <main>
            {/* style={{ borderTop: "1px inset white" }} */}
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
            </main>
            
            <footer></footer>
        </TaskWorkProvider>
    );
};

export default MainLayout;