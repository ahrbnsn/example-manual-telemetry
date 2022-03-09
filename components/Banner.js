import { useState } from "react";
import Link from "./Link";

export function Banner() {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div className="signUpBanner">
        <Link href="https://docs.honeycomb.io/getting-started/quickstart/">
          Create a free account to explore your data in Honeycomb
        </Link>
        <span onClick={() => setShow(false)}>x</span>
      </div>
    );
  }

  return null;
}

export default Banner;
