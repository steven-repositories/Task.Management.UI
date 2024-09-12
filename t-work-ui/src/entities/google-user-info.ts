import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("GoogleUserInfo")
export class GoogleUserInfo {
    @JsonProperty("email", String)
    email: string = "";

    @JsonProperty("email_verified", Boolean)
    isEmailVerified: boolean = false;

    @JsonProperty("family_name", String)
    familyName: string = "";

    @JsonProperty("given_name", String)
    givenName: string = "";

    @JsonProperty("name", String)
    fullName: string = "";

    @JsonProperty("picture", String)
    profilePictureURL: string = "";

    @JsonProperty("sub", String)
    sub: string = "";
};