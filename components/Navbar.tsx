import React from "react";
import "./stylesNavbar.css";
import OverlayBox from "./OverlayBox";

import { CSSProperties } from "react";

const Navbar: React.FC<{ id: number }> = ({ id }) => {
  return (
    <nav className="fixed top-0 right-0  z-50 flex flex-row justify-between pr-10 pt-10 space-x-8 text-1xl font-regular">
      <div className="group">
        <a
          className={`hover group-hover ${
            id == 1 ? "text-red-600" : "text-white"
          } `}
        >
          The Story
        </a>
        <OverlayBox>
          <p>Coming soon...</p>
        </OverlayBox>
      </div>
      <div className="flex flex-col items-center ">
        <a
          className={`flex items-center justify-center flex-row hover ${
            id == 2 ? "text-red-600" : "text-white"
          } `}
          href="/discord"
        >
          Discord
        </a>
        <img
          src="/discord/discord.png"
          alt="Discord Logo"
          width={50}
          height={50}
        />
      </div>
      <div className="group">
        <a
          className={`hover group-hover ${
            id == 3 ? "text-red-600" : "text-white"
          } `}
        >
          Mods
        </a>
        <OverlayBox>
          <p>Coming soon...</p>
        </OverlayBox>
      </div>
      <div className="group">
        <a
          className={`hover group-hover ${
            id == 4 ? "text-red-600" : "text-white"
          } `}
        >
          Wiki
        </a>
        <OverlayBox>
          <p>Coming soon...</p>
        </OverlayBox>
      </div>
      <a
        className={`hover ${id == 5 ? "text-red-600" : "text-white"} `}
        href="/"
      >
        Play now
      </a>
    </nav>
  );
};

export default Navbar;
