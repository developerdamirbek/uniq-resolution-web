import type { RoutesType } from "../types/types";
import { Home } from "./LazyComponents";

export const routes: RoutesType[] = [
    {
        id: 1,
        name: 'Home',
        path: '/',
        component: Home,
    },
]