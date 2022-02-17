import Link from "./Link";

export function Banner() {
  return (
    <Link href="https://docs.honeycomb.io/getting-started/quickstart/">
      <div className="signUpBanner">
        Create a free account to explore your data in Honeycomb
      </div>
    </Link>
  );
}

export default Banner;
