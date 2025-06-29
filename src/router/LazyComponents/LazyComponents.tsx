import { lazy } from "react";
import { Loading } from "../../components/layout";

const handleCatchChunkError = () => {
  return { default: Loading };
};

export const Home = lazy(() =>
  import("../../pages/Home")
    .then(({ Home }) => ({ default: Home }))
    .catch(handleCatchChunkError)
);

export const Skills = lazy(() => 
  import("../../pages/Skills")
    .then(({ Skills }) => ({ default: Skills }))
    .catch(handleCatchChunkError)
);

export const Socials = lazy(() =>
  import("../../pages/Socials")
    .then(({ Socials }) => ({ default: Socials }))
    .catch(handleCatchChunkError)
);

export const Projects = lazy(() =>
  import("../../pages/Projects")
    .then(({ Projects }) => ({ default: Projects }))
    .catch(handleCatchChunkError)
);

export const Logo = lazy(() =>
  import("../../pages/Logo")
    .then(({ Logo }) => ({ default: Logo }))
    .catch(handleCatchChunkError)
);