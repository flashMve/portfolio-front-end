import React from "react";

const NavigationDots = ({ active }) => {
  return (
    <div className="app__navigation">
      {["home", "about", "work", "skills", "testimonials", "contact"].map(
        (navBar, index) => (
          <a
            className="app__navigation-dot"
            style={active === navBar ? { backgroundColor: "#313BAC" } : {}}
            key={navBar + index}
            href={`#${navBar}`}
          />
        )
      )}
    </div>
  );
};

export default NavigationDots;
