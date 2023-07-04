import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export const LogoLink = () => {
  return (
    <Link href="/" className="group flex gap-2 flex-center">
      <Image
        src="/assets/images/logo.svg"
        alt="Promptopia Logo"
        width={30}
        height={30}
        className="object-contain group-hover:animate-spin"
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
      className={
        setToggleDropdown
          ? "border-t mt-5 pt-1 w-full transition duration-300 ease-in-out hover:text-red-500 hover:scale-105 "
          : "" + "black_btn"
      }
    >
      Sign Out
    </button>
  );
};
