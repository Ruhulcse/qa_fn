/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../config/config";

function SingleContent({ singleQuestion, fetchQuestions }) {
  const determineInitialBgColor = () => {
    console.log("function called");
    if (singleQuestion.upvote == true) {
      return "bg-green-600";
    } else if (singleQuestion.downvote == true) {
      return "bg-red-600";
    }
    return "bg-slate-500";
  };

  const determineActiveStatus = () => {
    if (singleQuestion.upvote == true) {
      return "up";
    } else if (singleQuestion.downvote) {
      return "down";
    } else {
      return null;
    }
  };

  const [isVoting, setIsVoting] = useState(false);
  const [bgColor, setBgColor] = useState(determineInitialBgColor());
  const [activeButton, setActiveButton] = useState(determineActiveStatus);
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data.ip;
  };
  const handleUpVote = async (question) => {
    setIsVoting(true);
    if (activeButton === "up") {
      setActiveButton(null);
      setBgColor("bg-slate-500");
    } else {
      setActiveButton("up");
      setBgColor("bg-green-600");
    }

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
    if (activeButton === "down") {
      setActiveButton(null);
      setBgColor("bg-slate-500");
    } else {
      setActiveButton("down");
      setBgColor("bg-red-600");
    }

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
        <div className="flex  gap-6 mt-4 ">
          <div
            className={`flex items-center ${bgColor} w-[20%] md:w-[15%] lg:w-[10%] justify-between text-white  mt-2   rounded-full`}
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
            <title className="card-title text-start text-4xl text-white">
              {singleQuestion.question}
            </title>
          </div>
        </div>

        <div className="text-start  pl-[22%] md:pl-[17%] lg:pl-[12%] ">
          <p className="text-white">{singleQuestion.answer}</p>
          <p className="pl-4 mt-4 text-sm">{singleQuestion.explaination}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleContent;
