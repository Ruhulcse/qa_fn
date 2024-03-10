import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import baseUrl from "../config/config";
import SingleContent from "./SingleContent";

const Content = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(() => {
    console.log("function called ");
    axios.get(`${baseUrl}/getquestion`).then((response) => {
      console.log("result ", response);
      const result = response.data.data.Question;
      setQuestions(result);
    });
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="w-full max-w-6xl mx-auto">
        {questions.map((singleQuestion) => (
          <div key={singleQuestion._id} className="card w-full p-3 mt-6">
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
