/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { BiSolidDownArrowCircle, BiSolidUpArrowCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../config/config";

function SingleContent({ singleQuestion }) {
  const [likeCount, setLikeCount] = useState(0);

  const notify = (msg) => toast(`${msg}`);
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data.ip;
  };

  const handleUpVote = async (question) => {
    const ipAddress = await getData();
    const payload = {
      voteType: "upvote",
      voterIP: ipAddress,
    };
    setLikeCount(likeCount + 1);
    const { data } = await axios.post(
      `${baseUrl}/questions/${question._id}/vote`,
      payload
    );
    notify(data);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  const handleDownVote = async (question) => {
    const ipAddress = await getData();
    const payload = {
      voteType: "downvote",
      voterIP: ipAddress,
    };
    const { data } = await axios.post(
      `${baseUrl}/questions/${question._id}/vote`,
      payload
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
      <div className="items-start btn btn-ghost flex w-44 mt-4">
        <button
          className="flex justify-center items-center"
          onClick={() => handleUpVote(singleQuestion)}
        >
          <BiSolidUpArrowCircle className="text-3xl"></BiSolidUpArrowCircle>
          <p className="text-2xl">{singleQuestion.total_vote}</p>
        </button>
        <button
          className="flex justify-center items-center"
          onClick={() => handleDownVote(singleQuestion)}
        >
          <BiSolidDownArrowCircle className="text-3xl"></BiSolidDownArrowCircle>
        </button>
      </div>
    </div>
  );
}

export default SingleContent;
