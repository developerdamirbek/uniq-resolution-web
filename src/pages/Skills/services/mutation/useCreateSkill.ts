import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/requests";

export const useCreateSkill = () => {
    return useMutation({
        mutationKey: ['skill'],
        mutationFn: (data) => request.post("/skill", data).then((res) => res.data)
    })
}