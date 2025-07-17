import { useMutation } from "@tanstack/react-query";
import request from "../api/instance";

export const useDeleteCompany = () => {
    return useMutation({
        mutationKey: ["delete-company"],
        mutationFn: (id: string) =>
            request.delete(`/companies/${id}`).then((res) => res.data),
    });
}