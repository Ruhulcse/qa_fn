/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../config/config";

function SingleContent({ singleQuestion, fetchQuestions }) {
  const [isVoting, setIsVoting] = useState(false);
  const [bgColor, setBgColor] = useState("bg-slate-500");
  const [activeButton, setActiveButton] = useState(null);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data.ip;
  };

  const handleUpVote = async (question) => {
    setIsVoting(true);
    setActiveButton("up");
    setBgColor("bg-green-600");
    try {
      const ipAddress = await getData();
      const payload = {
        voteType: "upvote",
        voterIP: ipAddress,
      };
      await axios.post(`${baseUrl}/questions/${question._id}/vote`, payload);
      fetchQuestions(); // Fetch the latest questions data after voting
    } catch (error) {
      console.log(error);
    } finally {
      setIsVoting(false); // Re-enable voting buttons
    }
  };

  const handleDownVote = async (question) => {
    setIsVoting(true);
    setActiveButton("down");
    setBgColor("bg-red-600");

    try {
      const ipAddress = await getData();
      const payload = {
        voteType: "downvote",
        voterIP: ipAddress,
      };
      await axios.post(`${baseUrl}/questions/${question._id}/vote`, payload);
      fetchQuestions(); // Fetch the latest questions data after voting
    } catch (error) {
      console.log(error);
    } finally {
      setIsVoting(false); // Re-enable voting buttons
    }
  };

  return (
    <div>
      <div>
        <div className="flex  gap-4  items-center">
          <div
            className={`flex items-center ${bgColor} w-[20%] md:w-[15%] lg:w-[10%] justify-between text-white    rounded-full`}
          >
            <button
              disabled={isVoting}
              className={`flex items-center justify-center rounded-full gap-2 ${singleQuestion.upvote} text-white  transition duration-300 ease-in-out`}
              onClick={() => handleUpVote(singleQuestion)}
            >
              <TbArrowBigUp
                className={`text-3xl ${
                  activeButton === "up" ? " text-white" : " text-gray-400"
                } `}
              />
              <span className="text-xl"></span>
            </button>
            <h1>{singleQuestion.total_vote}</h1>
            <button
              disabled={isVoting}
              className={`flex items-center justify-center rounded-full w-[40px] h-[40px] gap-2 ${singleQuestion.upvote} text-white  transition duration-300 ease-in-out`}
              onClick={() => handleDownVote(singleQuestion)}
            >
              <TbArrowBigDown
                className={`text-3xl ${
                  activeButton === "down" ? " text-white" : " text-gray-400"
                } `}
              />
              <span className="text-xl"></span>
            </button>
          </div>
          <div>
            {" "}
            <title className="card-title text-start text-white">
              {singleQuestion.question}
            </title>
          </div>
        </div>
        <p className="text-start  pl-[22%] md:pl-[17%] lg:pl-[12%] ">
          {singleQuestion.answer}
        </p>
      </div>
    </div>
  );
}

export default SingleContent;
