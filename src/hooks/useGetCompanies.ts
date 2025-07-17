import { useQuery } from "@tanstack/react-query";
import request from "../api/instance";

export const useGetCompanies = () => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: () => request.get("/companies").then((res) => res.data),
    });
}