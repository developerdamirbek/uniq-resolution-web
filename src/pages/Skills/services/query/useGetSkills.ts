import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/requests";

export const useGetSkills = () => {
    return useQuery({
        queryKey: ["skills"],
        queryFn: () => request.get("/myskill").then((res) => res.data )
    })
}