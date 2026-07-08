import Courses from "./sections/Courses";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Stats from "./sections/Stats";
import Stories from "./sections/Stories";
const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Stats />
      <Courses />
      <Stories />
    </div>
  );
};

export default Home;
