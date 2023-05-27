import anime from "animejs";
import React, { useEffect } from "react";

export const BasicAnimation = () => {
  useEffect(() => {
    anime({
      targets: ".green, .red, .blue",
      translateX: "13.5rem",
      scale: [0.75, 0.9],
      delay: function (el, index) {
        return index * 80;
      },
      direction: "alternate",
      loop: true,
    });
  }, []);

  return (
    <>
      <article>
        <div className="box green" />
        <div className="box blue" />
        <div className="box red" />
      </article>
      <footer>
        <span>Made with</span> <a href="http://anime-js.com">anime.js</a>
      </footer>
    </>
  );
};
