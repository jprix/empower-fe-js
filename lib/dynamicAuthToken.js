// utils/authToken.js
import { getAuthToken } from "@dynamic-labs/sdk-react-core";

export const fetchDynamicJWTToken = () => {
    return getAuthToken();
};
