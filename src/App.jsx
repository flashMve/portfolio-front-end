import React from "react";

import { About, Header, Footer, Skills, Testimonials, Work } from "./container";
import { NavBar } from "./components";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
