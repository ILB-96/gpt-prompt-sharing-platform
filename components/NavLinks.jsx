import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth";

export const LogoLink = () => {
  return (
    <Link href="/" className="flex gap-2 flex-center">
      <Image
        src="/assets/images/logo.svg"
        alt="Promptopia Logo"
        width={30}
        height={30}
        className="object-contain"
      />
      <p className="logo_text">Promptopia</p>
    </Link>
  );
};

export const NavLink = ({ endpoint, setToggleDropdown }) => {
  return (
    <Link
      href={endpoint}
      className={setToggleDropdown ? "dropdown_link" : "outline_btn"}
      onClick={() => setToggleDropdown(false)}
    >
      {endpoint === "/profile" ? "My Profile" : "Create Prompt"}
    </Link>
  );
};

export const SignInButton = ({ providers }) => {
  return (
    providers &&
    Object.values(providers).map((provider) => (
      <button
        type="button"
        key={provider.name}
        className="black_btn"
        onClick={() => signIn(provider.id)}
      >
        Sign In
      </button>
    ))
  );
};

export const SignOutButton = ({ setToggleDropdown }) => {
  return (
    <button
      type="button"
      onClick={() => {
        signOut();
        setToggleDropdown ? setToggleDropdown(false) : null;
      }}
      className={setToggleDropdown ? "mt-5 w-full " : "" + "black_btn"}
    >
      Sign Out
    </button>
  );
};
