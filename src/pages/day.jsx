import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { day } = useParams();

  const onClickNext = () => {
    if (currentPage < dailyData.sentences.length - 1)
      setCurrentPage(currentPage + 1);
  };
  const onClickPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const onClickSound = () => {};

  useEffect(() => {
    englishData.forEach((v) => {
      if (v.day === +day) setDailyData(v);
    });
  }, [day]);

  useEffect(() => console.log(dailyData), [dailyData]);

  if (!dailyData) return <div>Loading...</div>;

  return (
    <div className="container relative">
      <div className="absolute top-0 left-0 p-8">
        <Link to="/" className="text-3xl hover:text-gray-400">
          <FiHome />
        </Link>
      </div>
      <h1 className="text-center text-2xl font-semibold">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <div>{dailyData.sentences[currentPage].english}</div>
        <button
          className={`${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </button>
        <div className="mt-4">
          <button className="btn-style" onClick={onClickPrev}>
            Prev
          </button>
          <button className="btn-style ml-2" onClick={onClickNext}>
            Next
          </button>
          <button className="btn-style ml-2" onClick={onClickSound}>
            Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day;
