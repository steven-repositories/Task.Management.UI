import axios, { AxiosHeaders, HttpStatusCode } from "axios";
import { StorageKeys } from "../hooks/keys/storage-keys";

type GetApiEndpointProps = {
    brand: string,
    endpoint: string
};

const GetApiEndpoint = ({ brand, endpoint }: GetApiEndpointProps) => {
    let domain: string = "";

    switch (brand) {
        case "taskwork":
            domain = "http://localhost:4000/";
            break;
        case "google":
            domain = "https://www.googleapis.com/";
            break;
        default:
            break;
    };

    return `${domain}${endpoint}`;
};

const ExternalRequestOptions = (token: string) => {
    const headers = new AxiosHeaders();
    headers.setAuthorization(`Bearer ${token}`);

    return headers.toJSON();
};

export const GetGoogleUserInfo = async () => {
    try {
        const details = {
            brand: "google",
            endpoint: "oauth2/v3/userinfo"
        } as GetApiEndpointProps;
    
        const token = sessionStorage.getItem(StorageKeys.USER_TOKEN)!;
    
        if (!Boolean(token)) {
            throw new Error("Authorization token is required.");
        }
    
        const options = ExternalRequestOptions(token);
        const endpoint = GetApiEndpoint(details);

        const result = await axios.get(endpoint, { 
            headers: options
        });
    
        if (result.status !== HttpStatusCode.Ok) {
            throw new Error("Failed to retrieve google user information.");
        }
    
        return result.data;
    } catch (error) {
        console.error(error);
    }
};