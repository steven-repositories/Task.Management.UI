import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { QueryKeys } from "../keys/query-keys";
import { StorageKeys } from "../keys/storage-keys";
import { JsonConvert } from "json2typescript";
import { GoogleUserInfo } from "../models/google-user-info";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../configurations/microsoft-auth-config";
import { AccountInfo } from "@azure/msal-browser";
import { GetGoogleUserInfo } from "../integration/data-manager";
import { MicrosoftUserInfo } from "../models/microsoft-user-info";
import { User } from "../models/user-info";

type QueryProps = {
    onSuccess?: (result: unknown) => void,
    onError?: (e: Error) => void
};

export const useUser = () => {
    return useQuery({
        queryKey: [QueryKeys.GOOGLE_USER, QueryKeys.MICROSOFT_USER, QueryKeys.LINKEDIN_USER, QueryKeys.SLACK_USER, QueryKeys.TASKWORK_USER],
        queryFn: () => {
            const sessionUser = sessionStorage.getItem(StorageKeys.USER_PROFILE);
            
            if (!Boolean(sessionUser)) {
                return null;
            }

            return User.from(sessionUser!);
        }
    });
};

export const useSetupGoogleUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (token: string) => {
            sessionStorage.setItem(StorageKeys.USER_TOKEN, token);

            const user = await GetGoogleUserInfo();
            
            sessionStorage.setItem(StorageKeys.USER_IDENTITY, QueryKeys.GOOGLE_USER);
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
};

export const useSetupMicrosoftUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
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
};

export const useMicrosoftLogin = ({ onSuccess, onError }: QueryProps) => {
    const queryClient = useQueryClient();
    const { instance } = useMsal();

    return useMutation({
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
};

export const useLogout = () => {

};