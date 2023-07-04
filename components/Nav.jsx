"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProviders, useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";
import { LogoLink, NavLink, SignInButton, SignOutButton } from "./NavLinks";
import NavDropdown from "./NavDropdown";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const providersHandler = async () => {
      const providersResponse = await getProviders();
      setProviders(providersResponse);
    };
    providersHandler();
  }, []);

  return (
    <nav className="flex-between w-full mb-17 pt-3">
      <LogoLink />

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <NavLink endpoint="/create-prompt" />
            <SignOutButton />
            <Link href="/profile" className="flex gap-2">
              <ProfileImage avatar={session?.user.image} />
            </Link>
          </div>
        ) : (
          <SignInButton providers={providers} />
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="group flex">
            <ProfileImage
              avatar={session?.user.image}
              setToggleDropdown={setToggleDropdown}
            />
            <div className="scale-0 group-hover:scale-100 absolute transition duration-200 ease-in-out origin-top">
              <NavDropdown
                toggleDropdown={toggleDropdown}
                setToggleDropdown={setToggleDropdown}
              />
            </div>
          </div>
        ) : (
          <SignInButton providers={providers} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
