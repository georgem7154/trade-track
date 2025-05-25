import React from "react";
import { delay, motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{
          x: "200%",
          height:"80vh",
          scale: 0.5,
        }}
        animate={{
          x: 0,
          scale: 1,
          height:"100vh",
          transition: {
            borderRadius:{delay:0.5},
            scale: { delay: 1, duration: 1 },
            height:{delay:1},
            x: { duration: 1 },
          },
        }}
        exit={{
          scale: 0.5,
          x: "-100%",
          height: "50vh",
          transition: {
            scale: { duration: 0.5 },
            x: { delay: 0.5, duration: 0.5 },
          },
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          transformOrigin: "center",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
