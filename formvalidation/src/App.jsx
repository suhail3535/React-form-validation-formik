import { useState } from "react";
import "./App.css";

import { Signup } from "./component/Signup";
import Data from "./component/Data";
import Header from "./component/Header";
import HeroSection from "./component/HeroSection";
import RetreatList from "./component/RetreatList";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="overflow-hidden">
      {/* <Signup />
      <Data /> */}
      <Header />
      <HeroSection />
      <RetreatList />
      <Footer />
    </div>
  );
}

export default App;
