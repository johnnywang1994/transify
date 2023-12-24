import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { useLocation, Location } from "react-router-dom";

const previousRouteContext = createContext<PreviousRoute>(null as any);
const { Provider } = previousRouteContext;

type PreviousRoute = {
  to: Location;
  from: Location;
};

export function PreviousRouteProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const [prevRoute, setPrevRoute] = useState<PreviousRoute>({
    to: location,
    from: location,
  });

  useEffect(() => {
    setPrevRoute((prev) => ({ to: location, from: { ...prev.to } }));
  }, [location]);

  return <Provider value={prevRoute}>{children}</Provider>;
}

export default function usePreviousRoute() {
  return useContext(previousRouteContext);
}
