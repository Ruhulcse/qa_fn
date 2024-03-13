/* eslint-disable react/prop-types */
import axios from "axios";
import { BiSolidDownArrowCircle, BiSolidUpArrowCircle } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../config/config";

function SingleContent({ singleQuestion, fetchQuestions }) {
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data.ip;
  };

  const handleUpVote = async (question) => {
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
    }
  };

  const handleDownVote = async (question) => {
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
            singleQuestion.upvote
              ? "bg-green-400"
              : "bg-blue-800 hover:bg-blue-500"
          } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out`}
          onClick={() => handleUpVote(singleQuestion)}
        >
          <BiSolidUpArrowCircle className="text-3xl" />
          <span className="text-xl"></span>
        </button>
        <h1>{singleQuestion.total_vote}</h1>
        <button
          className={`flex items-center justify-center gap-2 ${
            singleQuestion.downvote
              ? "bg-red-400"
              : "bg-red-500 hover:bg-red-600"
          } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out`}
          onClick={() => handleDownVote(singleQuestion)}
        >
          <BiSolidDownArrowCircle className="text-3xl" />
        </button>
      </div>
    </div>
  );
}

export default SingleContent;
