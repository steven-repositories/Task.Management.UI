import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("MicrosoftUserInfo")
export class MicrosoftUserInfo {
    @JsonProperty("idToken", String)
    token: string = "";

    @JsonProperty("localAccountId", String)
    accountId: string = "";

    @JsonProperty("name", String)
    fullName: string = "";

    @JsonProperty("username", String)
    email: string = "";
};