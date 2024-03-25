import React from "react";

const Section: React.FC<{ id: string; background?: string }> = ({
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
    <section
      id={id}
      className="h-screen flex items-center justify-center"
      style={sectionStyle}
    >
      <div
        className="absolute"
        style={{ backgroundImage: "/aroundLine.svg" }}
      ></div>
      {children}
    </section>
  );
};

export default Section;
