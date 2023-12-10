import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap,MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client/client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import "./Skills.scss";

const hexToRgbA = (hex, opacity) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ","
    )},${opacity})`;
  }
  throw new Error("Bad Hex");
};

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [experiences, setExperiences] = useState(null);

  useEffect(() => {
    const query = '*[_type=="experiences"] | order(year desc)';
    const skillsQuery = '*[_type=="skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills &&
            skills?.map((skill,index) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skill-item app__flex"
                key={skill+index}
              >
                <div
                  className="app__flex"
                  style={{ backgroundColor: hexToRgbA(skill.bgColor, 0.2) }}
                >
                  <img src={urlFor(skill.icon)} alt={skill.name} />
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
            ))}
        </motion.div>

        <motion.div className="app__skills-exp">
          {experiences &&
            experiences?.map((exp,index) => (
              <>
                <motion.div className="app__skills-exp-item" key={exp.year+index}>
                  <div className="app__skills-exp-year">
                    <p className="bold-text">{exp.year}</p>
                  </div>

                  <motion.div className="app__skills-exp-works">
                    {exp?.works?.map((work, index) => (
                      <>
                        <motion.div
                          whileInView={{ opacity: [0, 1] }}
                          transition={{ duration: 0.5 }}
                          className="app__skills-exp-work"
                          data-tooltip-content={work.desc}
                          id={work.name}
                          key={work+index+exp.year }
                        >
                          <h4 className="bold-text">{work.name}</h4>
                          <p className="p-text">{work.company}</p>
                        </motion.div>
                        <ReactTooltip
                          key={work.name}
                          anchorId={work.name}
                          noArrow={true}
                          className="skills-tooltip"
                        />
                      </>
                    ))}
                  </motion.div>
                </motion.div>
              </>
            ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Skills,'app__skills'),'skills','app__whitebg');
