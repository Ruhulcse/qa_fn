/* eslint-disable react/prop-types */
import axios from "axios";
import { BiSolidDownArrowCircle, BiSolidUpArrowCircle } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../config/config";
import { useEffect, useState } from "react";

function SingleContent({ singleQuestion, fetchQuestions }) {
  // modifiaction
  const [voteStatus, setVoteStatus] = useState({
    upvote: singleQuestion.upvote,
    downvote: singleQuestion.downvote,
  });

  const [voteMassage, setVoteMassage] = useState("");
  useEffect(() => {
    if (singleQuestion.upvote) {
      setVoteMassage("you have already upvoted this question.");
    } else if (singleQuestion.downvote) {
      setVoteMassage("you have already downvoted this question.");
    }
  }, [singleQuestion]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data.ip;
  };

  const handleUpVote = async (question) => {
    try {
      if (voteStatus.upvote) {
        setVoteMassage("you have already upvoted this question.");
      }
      const ipAddress = await getData();
      const payload = {
        voteType: "upvote",
        voterIP: ipAddress,
      };
      await axios.post(`${baseUrl}/questions/${question._id}/vote`, payload);
      setVoteStatus({ ...voteStatus, upvote: true });
      fetchQuestions(); // Fetch the latest questions data after voting
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownVote = async (question) => {
    try {
      if (voteStatus.downvote) {
        setVoteMassage("you have already downvoted this question");
      }
      const ipAddress = await getData();
      const payload = {
        voteType: "downvote",
        voterIP: ipAddress,
      };
      await axios.post(`${baseUrl}/questions/${question._id}/vote`, payload);
      setVoteStatus({ ...voteStatus, downvote: true });
      fetchQuestions(); // Fetch the latest questions data after voting
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <div>{/* <h1 className="text-xl">{msg}</h1> */}</div>
        <div>
          <title className="card-title text-start">
            {singleQuestion.question}
          </title>
          <p className="text-start">{singleQuestion.answer}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          className={`flex items-center justify-center gap-2 ${
            voteStatus.upvote ? "bg-green-400" : "bg-blue-800 hover:bg-blue-500"
          } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out`}
          onClick={() => handleUpVote(singleQuestion)}
        >
          <BiSolidUpArrowCircle className="text-3xl" />
          <span className="text-xl"></span>
        </button>
        <h1>{singleQuestion.total_vote}</h1>
        <button
          className={`flex items-center justify-center gap-2 ${
            voteStatus.downvote ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
          } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out`}
          onClick={() => handleDownVote(singleQuestion)}
        >
          <BiSolidDownArrowCircle className="text-3xl" />
        </button>
      </div>
      {voteMassage && <p className="text-red-500">{voteMassage}</p>}
    </div>
  );
}

export default SingleContent;
