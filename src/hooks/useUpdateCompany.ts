import { useMutation } from "@tanstack/react-query";
import request from "../api/instance";
import type { Company } from "../types/types";

export const useUpdateCompany = () => {
    return useMutation({
        mutationKey: ["update-company"],
        mutationFn: (data: Omit<Company, "created_at">) =>
            request.put(`/companies/${data.id}`, data).then((res) => res.data),
    });
}