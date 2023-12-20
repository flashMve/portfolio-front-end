import React, { useState } from "react";
import "./NavBar.scss";

import { HiMenuAlt4, HiX } from "react-icons/hi";

import { motion } from "framer-motion";

import { images } from "../../constants";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "work", "skills", "testimonials", "contact"].map(
          (navBar) => (
            <li key={`link-${navBar}`} className="app__flex p-text">
              <div />
              <a href={`#${navBar}`}>{navBar}</a>
            </li>
          )
        )}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {[
                "home",
                "about",
                "work",
                "skills",
                "testimonials",
                "contact",
              ].map((navBar) => (
                <li key={navBar}>
                  <a href={`#${navBar}`} onClick={() => setToggle(false)}>
                    {navBar}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
