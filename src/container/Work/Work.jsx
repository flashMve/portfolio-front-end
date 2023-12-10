import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap,MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client/client";

import "./Work.scss";

const Work = () => {
  const [active, setActive] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);

  const handleWorkFilter = (item) => {
    active === item ? setActive("All") : setActive(item);
    const isActive = active === item ? "All" : item;
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });

      if (isActive === "All") {
        setFilterWorks(works);
      } else {
        const filter = works.filter((work) =>
          work.tags.includes(item.toLowerCase())
        );
        setFilterWorks(filter);
      }
    }, 500);
  };

  const handleCategory = () => {
    const categoryTemp = [];
    works.forEach((work) => {
      categoryTemp.push(work.tags[0].toUpperCase());
    });
    setCategory(categoryTemp);
  };

  useEffect(() => {
    const query = '*[_type=="works"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setWorks(data);
      handleCategory();
      setFilterWorks(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        My Creative<span> Portfolio </span>Section
      </h2>
      <div className="app__work-filter">
        {console.log(category)}
        {category.map((item, index) => (
          <div
            className={`app__work-filter-item app__flex p-text ${
              active === item ? "item-active" : ""
            }`}
            key={item + index}
            onClick={() => handleWorkFilter(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWorks.map((work, index) => (
          <div className="app__work-item app__flex" key={work + index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  staggerChildren: 0.5,
                  ease: "easeInOut",
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work?.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work?.description}
              </p>
              <div className="app__work-tag app__flex">{work.tags[0]}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work,'app__work'), "work",'app__primarybg');
