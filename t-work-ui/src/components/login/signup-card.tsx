"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Label } from "../common/customs";
import { CardHeader, CardBody, Input, Button } from "@nextui-org/react";

type SignupCardProps = {
    setIsInvalid: Dispatch<SetStateAction<boolean>>
};

const SignupCard = ({ setIsInvalid }: SignupCardProps) => {
    const [isInputInvalid, setIsInputInvalid] = useState(false);

    useEffect(() => {
        setIsInvalid(isInputInvalid);
    }, [isInputInvalid]);

    return (
        <>
            <CardHeader
                style={{
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
                    gap="2.25rem"
                >
                    <Stack 
                        gap="0.25rem" 
                        direction="column"
                        fullWidth
                    >
                        <Input
                            variant="bordered"
                            type="email" 
                            label="Work email"
                            labelPlacement="outside"
                            placeholder="Enter your work email"
                            errorMessage="Please enter a valid email address."
                            validate={(value) => {
                                if(!Boolean(value)) {
                                    setIsInputInvalid(false);
                                    return undefined;
                                }
                                // Reference: https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs
                                const regexExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                const isEmailValid = regexExpression.test(value);

                                setIsInputInvalid(!isEmailValid);

                                return undefined;
                            }}
                            isInvalid={isInputInvalid}
                        />

                        <Label color="grey" size="10px">
                            I agree to the TaskWork Customer Agreement, 
                            which incorporates by reference the AI Product-Specific Terms, 
                            and acknowledge the Privacy Policy.
                        </Label>
                    </Stack>

                    <Stack 
                        justify="center" 
                        fullWidth
                    >
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
            </CardBody>
        </>
    );
};

export default SignupCard;