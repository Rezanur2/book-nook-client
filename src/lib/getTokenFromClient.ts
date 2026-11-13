import { authClient } from "@/lib/auth-client";
export const getTokenFromClient = async () => {
    const { data: info } = await authClient.token();
    const token = info?.token
    return token;
}