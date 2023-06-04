import { useEffect, useRef, DependencyList } from "react";

export default function useUpdateEffect(
  effect: () => void,
  dependencies: DependencyList = []
) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
