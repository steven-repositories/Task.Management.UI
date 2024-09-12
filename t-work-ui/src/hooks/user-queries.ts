import { useQuery } from "@tanstack/react-query";
import { Keys } from "./keys/query-keys";
import { JsonConvert } from "json2typescript";
import { GoogleUserInfo } from "../entities/google-user-info";

export const useGoogleUser = () => {
    return useQuery({
        queryKey: [Keys.GOOGLE_USER, Keys.MICROSOFT_USER, Keys.LINKEDIN_USER, Keys.SLACK_USER],
        queryFn: () => {
            const sessionedUser = sessionStorage.getItem(Keys.USER_PROFILE);

            if (!Boolean(sessionedUser)) {
                return null;
            }

            const jsonConvert = new JsonConvert();
            const googleUser = jsonConvert.deserialize(JSON.parse(sessionedUser!), GoogleUserInfo);

            return googleUser;
        }
    });
};