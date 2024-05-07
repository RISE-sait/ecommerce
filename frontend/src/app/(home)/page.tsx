import React from "react";
import BannerBottom from "@/components/home/Banner/BannerBottom";
import Banner from "@/components/home/Banner/Banner";

const Home = () => {
  return (
    <div className="mx-auto">
      <Banner />
      <BannerBottom />
    </div>
  );
};

export default Home;
