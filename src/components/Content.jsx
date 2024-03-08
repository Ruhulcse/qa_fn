import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../config/config";
import SingleContent from "./SingleContent";

const Content = () => {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}/getquestion`).then((data) => {
      const result = data.data.data.Question;
      setQuestion(result);
    });
  }, []);
  return (
    <div className="min-h-screen bg-slate-200">
      <div className="w-full max-w-6xl mx-auto">
        {question.map((singleQuestion) => (
          <div key={singleQuestion._id} className="card w-full p-3  mt-6">
            <SingleContent singleQuestion={singleQuestion} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
