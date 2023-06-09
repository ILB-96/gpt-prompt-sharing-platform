"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProviders } from "next-auth";
import Profile from "./Profile";
import { LogoLink, NavLink, SignInButton, SignOutButton } from "./NavLinks";
import NavDropdown from "./NavDropdown";

const Nav = () => {
  const isUserLoggedIn = true;
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
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <NavLink endpoint="/create-prompt" />
            <SignOutButton />
            <Link href="/profile" className="flex gap-2">
              <Profile />
            </Link>
          </div>
        ) : (
          <SignInButton providers={providers} />
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Profile setToggleDropdown={setToggleDropdown} />
            <NavDropdown
              toggleDropdown={toggleDropdown}
              setToggleDropdown={setToggleDropdown}
            />
          </div>
        ) : (
          <SignInButton providers={providers} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
