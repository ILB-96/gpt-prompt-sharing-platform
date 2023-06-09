import { NavLink, SignOutButton } from "./NavLinks";

const NavDropdown = ({ toggleDropdown, setToggleDropdown }) => {
  return (
    toggleDropdown && (
      <div className="dropdown">
        <NavLink endpoint="/profile" setToggleDropdown={setToggleDropdown} />
        <NavLink
          endpoint="/create-prompt"
          setToggleDropdown={setToggleDropdown}
        />
        <SignOutButton setToggleDropdown={setToggleDropdown} />
      </div>
    )
  );
};

export default NavDropdown;
