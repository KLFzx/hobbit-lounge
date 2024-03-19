import React from "react";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";

const Page: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Section background={"/images/back-2.jpg"}>
        <h1 className="text-4xl font-bold text-white">Discord</h1>
      </Section>
    </div>
  );
};

export default Page;
