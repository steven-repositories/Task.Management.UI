import { QueryClientConfig } from "@tanstack/react-query";

export const QueryClientConfiguration: QueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000
        }
    }
};