"use client";

import type { NextPage } from "next";
import HomePage from "~~/components/baseflowinventory/HomePage";

const Home: NextPage = () => {
  return (
    <section className="flex flex-col flex-grow">
      {/* Scaffold-Lisk header/layout stays via app/layout.tsx */}
      <HomePage />
    </section>
  );
};

export default Home;
