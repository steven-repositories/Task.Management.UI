import React from "react";
import { Stack, Label } from "../common/customs";
import { User } from "../../models/user-info";

type UtilityHeaderProps = {
    user: User
};

const UtilityHeader = ({ user }: UtilityHeaderProps) => {
    
    return (
        <Stack>
            <Label>Hello, UtilityHeader!</Label>
        </Stack>
    );
};

export default UtilityHeader;