import type { NextPage } from "next";
import { DonorsSection } from "../components/pages/home/donors-section";
import { HeroSection } from "../components/pages/home/hero-section";
import { HistorySection } from "../components/pages/home/history-section";
import { SiteFooter } from "../components/pages/site-footer";
import { SiteNav } from "../components/pages/site-nav";
import { WaveSeparator } from "../components/wave-separator";

const Home: NextPage = () => {
  return (
    <>
      <header className="site-header">
        <SiteNav />
        <HeroSection />
      </header>

      <WaveSeparator />

      <main className="main-container">
        <HistorySection />
        <DonorsSection />
      </main>

      <SiteFooter />
    </>
  );
};

const Home2: NextPage = () => {
  return <p>Dummy page!</p>;
};

export default Home;
