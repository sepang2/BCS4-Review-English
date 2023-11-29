import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <li className="flex flex-col hover:text-gray-700">
        <span className="font-semibold mr-2 text-xl">Day {day}</span>
        <span className="text-3xl font-bold">{title}</span>
      </li>
    </Link>
  );
};

export default MainCard;
