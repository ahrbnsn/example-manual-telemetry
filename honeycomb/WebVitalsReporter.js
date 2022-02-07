import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals";
import { useSpanContext } from "./useSpanContext";

function WebVitalsReporter() {
  const { sendEvent } = useSpanContext();

  useEffect(() => {
    getCLS((metrics) => sendEvent(metrics));
    getTTFB((metrics) => sendEvent(metrics));
    getFID((metrics) => sendEvent(metrics));
    getFCP((metrics) => sendEvent(metrics));
    getLCP((metrics) => sendEvent(metrics));
  }, []);

  return null;
}
