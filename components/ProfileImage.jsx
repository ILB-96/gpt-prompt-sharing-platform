import Image from "next/image";

const ProfileImage = ({ setToggleDropdown, avatar }) => {
  return (
    <Image
      src={avatar}
      alt="User Profile"
      width={40}
      height={40}
      className="rounded-full object-contain"
      onClick={() => {
        setToggleDropdown && setToggleDropdown((prev) => !prev);
      }}
    />
  );
};

export default ProfileImage;
