import { useMutation } from "@tanstack/react-query";
import request from "../../../config/requests";

type LoginData = {
    email: string;
    password: string;
}


export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginData) => request.post("/auth/login", data).then((res) => res.data),
    })
}