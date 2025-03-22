import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useNavigationHistory() {
  const [history, setHistory] = useState<string[]>([]);

  const router = useRouter();

  const handleRouteChange = (url: string) => {
    setHistory((prev) => [...prev, url]);
  };

  useEffect(() => {
    // Ensure router is mounted
    if (!router.isReady) return;

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.isReady, router.events]);

  return history;
}

export default useNavigationHistory;
