import { JsonConvert } from "json2typescript";
import { StorageKeys } from "../keys/storage-keys";
import { QueryKeys } from "../keys/query-keys";
import { GoogleUserInfo } from "./google-user-info";
import { MicrosoftUserInfo } from "./microsoft-user-info";

export class User {
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    profilePictureURL: string = "";

    private static splitFullName = (fullName: string) => {
        const nameParts = fullName
            .trim()
            .split(/\s+/);

        if (nameParts.length < 2) {
            throw new Error("Full name must contain at least a first name and a last name.");
        }

        const lastName = nameParts.pop!();
        const firstName = nameParts.join(" ");

        return {
            firstName,
            lastName
        };
    };

    static from = (data: string): User => {
        const userIdentity = sessionStorage.getItem(StorageKeys.USER_IDENTITY);
        const jsonConvert = new JsonConvert();
        const user = new User();

        switch (userIdentity) {
            case QueryKeys.GOOGLE_USER:
                const googleUser = jsonConvert
                    .deserialize(JSON.parse(data), GoogleUserInfo) as GoogleUserInfo;
                
                user.email = googleUser.email;
                user.firstName = googleUser.givenName;
                user.lastName = googleUser.familyName;
                user.fullName = googleUser.fullName;
                user.profilePictureURL = googleUser.profilePictureURL;
                break;
            case QueryKeys.MICROSOFT_USER:
                const microsoftUser = jsonConvert
                    .deserialize(JSON.parse(data), MicrosoftUserInfo) as MicrosoftUserInfo;

                const { firstName, lastName } = this.splitFullName(microsoftUser.fullName);

                user.email = microsoftUser.email;
                user.firstName = firstName;
                user.lastName = lastName!;
                user.fullName = microsoftUser.fullName;
                break;
        };

        return user;
    };
};