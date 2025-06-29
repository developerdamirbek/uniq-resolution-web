import { Home, Logo, Projects, Skills, Socials } from "./LazyComponents";

type RouteType = {
    id: number;
    path?: string;
    name: string;
    component: React.FC;
}

export const routes: RouteType[] = [
    {
        id: 1,
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        id: 2,
        name: 'Skills',
        path: '/skills',
        component: Skills,
    },
    {
        id: 3,
        name: 'Socials',
        path: '/socials',
        component: Socials,
    },
    {
        id: 4,
        name: 'Projects',
        path: '/projects',
        component: Projects,
    },
     {
        id: 5,
        name: 'Logo',
        path: '/logo',
        component: Logo,
    }
]