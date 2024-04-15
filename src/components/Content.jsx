import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import baseUrl from "../config/config";
import SingleContent from "./SingleContent";

const Content = () => {
  const [questions, setQuestions] = useState([]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data.ip;
  };

  const fetchQuestions = useCallback(async () => {
    console.log("function called ");
    const ipAddress = await getData();
    console.log(ipAddress);
    axios.get(`${baseUrl}/getquestion?ip=${ipAddress}`).then((response) => {
      console.log("result ", response);
      const result = response.data.data.Question;
      setQuestions(result);
    });
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="min-h-screen bg-[#95A5A6]">
      <div>
        <h1 className="uppercase text-4xl pt-20 pb-10 font-bold text-white flex justify-center items-center">
          Demo title
        </h1>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        {questions.map((singleQuestion) => (
          <div key={singleQuestion._id} className="card w-full p-3">
            <SingleContent
              singleQuestion={singleQuestion}
              fetchQuestions={fetchQuestions}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
