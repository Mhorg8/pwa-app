import { motion } from "framer-motion";

const animation = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const HomePage = () => {
  return (
    <div className="wrapper">
      <motion.h1
        variants={animation}
        initial="initial"
        animate="animate"
        className="text-6xl font-extrabold text-dark-green"
      >
        Everything you need is here.
      </motion.h1>
    </div>
  );
};

export default HomePage;
