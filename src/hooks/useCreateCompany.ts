import { useMutation } from "@tanstack/react-query";
import request from "../api/instance";

export const useCreateCompany = () => {
    return useMutation({
        mutationKey: ["create-company"],
        mutationFn: (data: { name: string; inn: string; status: string }) => request.post("/companies", data).then((res) => res.data),
    });
}