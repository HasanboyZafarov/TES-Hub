import Courses from "./sections/Courses";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Stats from "./sections/Stats";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Stats />
      <Courses />
    </div>
  );
};

export default Home;
