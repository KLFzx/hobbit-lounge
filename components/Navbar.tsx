import React from "react";
import "./stylesNavbar.css";

import { CSSProperties } from "react";

const Navbar: React.FC<{ id: string; background?: string }> = ({
  id,
  background,
  children,
}) => {
  const sectionStyle: CSSProperties = {
    backgroundImage: background ? `url(${background})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity 0.5s ease-in-out", // Adding transition property
  };

  return (
    <nav className="fixed top-0 right-0  shadow-lg z-50 flex flex-row justify-between pr-10 pt-10 space-x-8 text-2xl ">
      <a class="hover">The Story</a>
      <a class="hover" href="/discord">
        Discord
      </a>
      <a class="hover">Mods</a>
      <a class="hover">Wiki</a>
      <a class="hover">Play now</a>
    </nav>
  );
};

export default Navbar;
