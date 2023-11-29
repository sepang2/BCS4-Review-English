import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiChevronsRight,
  FiChevronsLeft,
  FiVolume2,
  FiSlash,
} from "react-icons/fi";
import axios from "axios";

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [speakingRate, setspeakingRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { day } = useParams();

  const onClickNext = () => {
    if (currentPage < dailyData.sentences.length - 1)
      setCurrentPage(currentPage + 1);
  };
  const onClickPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const onClickSpeed = () => {
    if (speakingRate === 1) setspeakingRate(2);
    if (speakingRate === 2) setspeakingRate(1);
  };
  const onClickSound = async () => {
    try {
      setIsLoading(true);
      if (isLoading) return;

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.sentences[currentPage].english,
          },
          voice: {
            languageCode: "en-gb",
            name: "en-GB-Standard-A",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: speakingRate,
            pitch: 0,
          },
        }
      );
      const binaryData = atob(response.data.audioContent); // sound data를 binary data로

      const byteArray = new Uint8Array(binaryData.length); // binary data를 byte array에 담기
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" }); // audio file로 변환
      const newAudio = new Audio(URL.createObjectURL(blob));

      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 5000);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

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
        <div className="mt-4 flex justify-between">
          <div>
            <button
              className={`btn-style ${
                currentPage === 0 && "hover:border-red-500 hover:text-red-500"
              }`}
              onClick={onClickPrev}
            >
              {currentPage === 0 ? <FiSlash /> : <FiChevronsLeft />}
            </button>
            <button
              className={`btn-style ml-2 ${
                currentPage === dailyData.sentences.length - 1 &&
                "hover:border-red-500 hover:text-red-500"
              }`}
              onClick={onClickNext}
            >
              {currentPage === dailyData.sentences.length - 1 ? (
                <FiSlash />
              ) : (
                <FiChevronsRight />
              )}
            </button>
          </div>
          <div>
            <button className="btn-style" onClick={onClickSpeed}>
              {`${speakingRate === 1 ? "x1" : "x2"}`}
            </button>
            <button
              className="btn-style ml-2 hover:border-blue-500 hover:text-blue-500"
              onClick={onClickSound}
            >
              <FiVolume2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day;
