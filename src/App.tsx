import Blog from "./components/main/blog";
import Contact from "./components/main/contact";
import Footer from "./components/main/footer";
import Hero from "./components/main/hero";
import Navbar from "./components/shared/navbar/navbar";
import TrainingSchedule from "./components/main/training-schedule";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TrainingSchedule />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
