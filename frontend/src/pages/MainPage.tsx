import { motion } from 'framer-motion';
import Home from './Home';
import About from './About';
import Events from './Events';
import Schedule from './Schedule';
import Registration from './Registration';

const pageVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } }
};

const MainPage = () => {
  return (
    <div className="overflow-x-hidden relative bg-background">
      <motion.div id="home" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={pageVariants}>
        <Home />
      </motion.div>
      <motion.div id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={pageVariants}>
        <About />
      </motion.div>
      <motion.div id="events" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={pageVariants}>
        <Events />
      </motion.div>
      <motion.div id="schedule" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={pageVariants}>
        <Schedule />
      </motion.div>
      <motion.div id="register" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={pageVariants}>
        <Registration />
      </motion.div>
    </div>
  );
};

export default MainPage;
