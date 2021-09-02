import About from "../components/About";
import TopCourts from "../components/TopCourts";
import data from "../utils/testData/testArrs";

export default function Home() {
  return (
    <>
      <TopCourts courtList={data.topCourts} />
      <About />
    </>
  );
}
