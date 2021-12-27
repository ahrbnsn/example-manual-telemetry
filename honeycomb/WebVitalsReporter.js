import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals";
import { useTraceContext } from "./useTraceContext";

function WebVitalsReporter({ fireEvent }) {
  const { sendEvent } = useTraceContext();

  useEffect(() => {
    getCLS((metrics) => sendEvent(metrics));
    getTTFB((metrics) => sendEvent(metrics));
    getFID((metrics) => sendEvent(metrics));
    getFCP((metrics) => sendEvent(metrics));
    getLCP((metrics) => sendEvent(metrics));
  }, []);

  return null;
}
