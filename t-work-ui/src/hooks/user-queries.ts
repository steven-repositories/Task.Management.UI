import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { QueryKeys } from "./keys/query-keys";
import { StorageKeys } from "./keys/storage-keys";
import { JsonConvert } from "json2typescript";
import { GoogleUserInfo } from "../entities/google-user-info";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/microsoft-auth-config";
import { AccountInfo } from "@azure/msal-browser";
import { GetGoogleUserInfo } from "../integration/data-manager";
import { MicrosoftUserInfo } from "../entities/microsoft-user-info";

type QueryProps = {
    onSuccess?: (result: unknown) => void,
    onError?: (e: Error) => void
};

export const useUser = () => {
    const { data } = useQuery({
        queryKey: [QueryKeys.GOOGLE_USER, QueryKeys.MICROSOFT_USER, QueryKeys.LINKEDIN_USER, QueryKeys.SLACK_USER, QueryKeys.TASKWORK_USER],
        queryFn: () => {
            const userIdentity = sessionStorage.getItem(StorageKeys.USER_IDENTITY);
            const sessionedUser = sessionStorage.getItem(StorageKeys.USER_PROFILE);

            const jsonConvert = new JsonConvert();

            switch (userIdentity) {
                case QueryKeys.GOOGLE_USER:
                    const googleUser = jsonConvert.deserialize(JSON.parse(sessionedUser!), GoogleUserInfo);
                    return googleUser as GoogleUserInfo;
                case QueryKeys.MICROSOFT_USER:
                    const microsoftUser = jsonConvert.deserialize(JSON.parse(sessionedUser!), MicrosoftUserInfo);
                    return microsoftUser as MicrosoftUserInfo;
                case QueryKeys.LINKEDIN_USER:
                    return;
                case QueryKeys.SLACK_USER:
                    return;
                case QueryKeys.TASKWORK_USER:
                    return;
                default:
                    return;
            };
        }
    });

    return data;
};

// export const useGoogleUser = () => {
//     const { data } = useQuery({
//         queryKey: [QueryKeys.GOOGLE_USER],
//         queryFn: () => {
//             const sessionedUser = sessionStorage.getItem(StorageKeys.USER_PROFILE);

//             if (!Boolean(sessionedUser)) {
//                 return null;
//             }

//             const jsonConvert = new JsonConvert();
//             const googleUser = jsonConvert.deserialize(JSON.parse(sessionedUser!), GoogleUserInfo);

//             return googleUser;
//         }
//     });

//     return data as GoogleUserInfo;
// };

// export const useMicrosoftUser = () => {
//     const { data } = useQuery({
//         queryKey: [QueryKeys.MICROSOFT_USER],
//         queryFn: () => {
//             const sessionedUser = sessionStorage.getItem(StorageKeys.USER_PROFILE);

//             if (!Boolean(sessionedUser)) {
//                 return null;
//             }

//             const jsonConvert = new JsonConvert();
//             const microsoftUser = jsonConvert.deserialize(JSON.parse(sessionedUser!), MicrosoftUserInfo);

//             return microsoftUser;
//         }
//     });

//     return data as MicrosoftUserInfo;
// };

export const useSetupGoogleUser = () => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (token: string) => {
            const user = await GetGoogleUserInfo();
            
            sessionStorage.setItem(StorageKeys.USER_IDENTITY, QueryKeys.GOOGLE_USER);
            sessionStorage.setItem(StorageKeys.USER_TOKEN, token);
            sessionStorage.setItem(StorageKeys.USER_PROFILE, JSON.stringify(user));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: [QueryKeys.GOOGLE_USER] 
            });
        },
        onError: (error) => {
            console.error(error);
        }
    });

    return mutate;
};

export const useSetupMicrosoftUser = () => {
    const queryClient = useQueryClient();
    
    const { mutate } = useMutation({
        mutationFn: async (data: AccountInfo) => {
            const jsonConvert = new JsonConvert();

            const user = jsonConvert.deserialize(data, MicrosoftUserInfo);
            
            if (!Boolean(user)) {
                throw new Error("Could not deserialize microsoft user data.");
            }

            const microsoftUser = user as MicrosoftUserInfo;

            sessionStorage.setItem(StorageKeys.USER_IDENTITY, QueryKeys.MICROSOFT_USER);
            sessionStorage.setItem(StorageKeys.USER_TOKEN, microsoftUser.token);
            sessionStorage.setItem(StorageKeys.USER_PROFILE, JSON.stringify(microsoftUser));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: [QueryKeys.MICROSOFT_USER]
            });
        },
        onError: (error) => {
            console.error(error);
        }
    });

    return mutate;
};

export const useMicrosoftLogin = ({ onSuccess, onError }: QueryProps) => {
    const queryClient = useQueryClient();
    const { instance } = useMsal();

    const { mutate } = useMutation({
        mutationFn: async () => {
            await instance.loginRedirect({
                ...loginRequest,
                prompt: "select_account"
            });
        },
        /// onSuccess will not work
        // if microsoft login is redirect
        // because it will trigger redirect first
        // before triggering this
        onSuccess: (result: unknown) => {
            if (Boolean(onSuccess)) {
                onSuccess!(result);
            }

            queryClient.invalidateQueries({ 
                queryKey: [QueryKeys.MICROSOFT_USER] 
            });
        },
        /// same goes here
        onError: (error) => {
            if (Boolean(onError)) {
                onError!(error);
            }
        }
    });
    
    return mutate;
};

export const useLogout = () => {

};