import Link from "./Link";

export function Banner() {
  return (
    <div className="signUpBanner">
      <Link href="https://docs.honeycomb.io/getting-started/quickstart/">
        Create a free account to explore your data in Honeycomb
      </Link>
    </div>
  );
}

export default Banner;
