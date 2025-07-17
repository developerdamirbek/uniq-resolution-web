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
