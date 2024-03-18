"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import { CSSProperties } from "react";

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
      {children}
    </section>
  );
};

const sectionsArray = [
  {
    id: "section0",
    background: "/images/back-0.jpg",
  },
  {
    id: "section1",
    background: "/images/back-1.jpg",
  },
  {
    id: "section2",
    background: "/images/back-2.jpg",
  },
  {
    id: "section3",
    background: "/images/back-3.jpg",
  },
];

const snapToSection = (
  nextSectionId: string,
  callback: (param: string) => void
) => {
  const nextSection = document.getElementById(nextSectionId);
  if (nextSection) {
    const scrollPos = nextSection.offsetTop;
    window.scrollTo({ top: scrollPos, behavior: "smooth" });
    callback(nextSectionId);
  }
};

const IndexPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let closestSectionId = "";
      let closestDistance = Infinity;

      sections.forEach((section: Element) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSectionId = section.id;
        }
      });

      setCurrentSection(closestSectionId);
    };

    const handleMouseWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      const currentSectionIndex = sections.findIndex(
        (section) => section.id === currentSection
      );
      const nextSectionIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentSectionIndex + delta)
      );
      const nextSectionId = sections[nextSectionIndex].id;
      snapToSection(nextSectionId, setCurrentSection);
    };

    const sections = Array.from(document.querySelectorAll("section"));

    document.addEventListener("scroll", handleScroll);
    handleScroll();

    document.addEventListener("wheel", handleMouseWheel);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("wheel", handleMouseWheel);
    };
  }, [currentSection]);

  return (
    <div>
      <Head>
        <title>Scrolling Sections</title>
        {/* Add any other necessary meta tags */}
      </Head>

      <nav className="fixed top-0 left-0 h-full shadow-lg z-50 flex flex-col justify-center pl-10">
        <ul className="flex flex-col items-start space-y-4">
          {sectionsArray.map((section, index) => (
            <li
              key={index}
              className={
                currentSection === section.id ? "font-bold" : "font-light"
              }
            >
              <button
                onClick={() => snapToSection(section.id, setCurrentSection)}
              >
                <Image
                  src={
                    currentSection === section.id
                      ? "icons/RectIn.svg"
                      : "icons/RectOut.svg"
                  }
                  alt="Vercel Logo"
                  width={45}
                  height={12}
                  priority
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {sectionsArray.map((section, index) => (
        <Section key={index} id={section.id} background={section.background}>
          <h1 className="text-4xl font-bold text-white">{section.id}</h1>
        </Section>
      ))}

      {/* Add more sections as needed */}
    </div>
  );
};

export default IndexPage;
