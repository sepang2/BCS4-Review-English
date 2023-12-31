import MainCard from "../components/MainCard";
import englishData from "../englishData.json";

const Main = () => {
  return (
    <div className="container">
      <h1 className="text-center font-black text-4xl">🇺🇸 Study English</h1>
      <ul className="mt-12 flex flex-col gap-8 pb-20">
        {englishData.map((v, i) => (
          <MainCard key={i} title={v.title} day={v.day} />
        ))}
      </ul>
    </div>
  );
};

export default Main;
