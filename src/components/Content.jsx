import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidDownArrowCircle, BiSolidUpArrowCircle } from "react-icons/bi";

const Content = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [leftlikeCount, setLeftCount] = useState(0);
  const [question, setQuestion] = useState([])
  const handleRightArrow = (id) => {
    setLikeCount(likeCount + 1);
    const filterData = () =>{
      useEffect(()=>{
        axios.get(`http://localhost:5000/getquestion/${id}`)
      .then(data=>console.log(data))
      },[])
    }
  };
  const handleLeftArrow = (id) => {
    setLeftCount(leftlikeCount + 1);
    const filterData = () =>{
      useEffect(()=>{
        axios.get(`http://localhost:5000/getquestion/${id}`)
      .then(data=>console.log(data))
      },[])
    }
  };

  // const Question = [
  //   {
  //     id: 1,
  //     question: "What is the capital of France?",
  //     answer: "The capital of France is Paris.",
  //   },
  //   {
  //     id: 2,
  //     question: "Who wrote 'Romeo and Juliet'?",
  //     answer: "William Shakespeare wrote 'Romeo and Juliet'.",
  //   },
  //   {
  //     id: 3,
  //     question: "What is the tallest mountain in the world?",
  //     answer: "Mount Everest is the tallest mountain in the world.",
  //   },
  // ];

  useEffect(()=>{
    axios.get("http://localhost:5000/getquestion")
    .then(data=>{
    const result = data.data.data.Question
    setQuestion(result)
    }
      )
  },[])
  return (
    <div className="min-h-screen bg-slate-200">
      <div className="w-full max-w-6xl mx-auto">
        {question.map((singleQuestion) => ( 
          <div key={singleQuestion._id} className="card w-full p-3  mt-6">
            <div className="flex gap-3">
              <div>
                <h1 className="text-xl">{singleQuestion.id}</h1>
              </div>
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
                onClick={()=>handleRightArrow(singleQuestion._id)}
              >
                <BiSolidUpArrowCircle className="text-3xl"></BiSolidUpArrowCircle>
                <p className="text-2xl">{likeCount}</p>
              </button>
              <button
                className="flex justify-center items-center"
                onClick={()=>handleLeftArrow(singleQuestion._id)}
              >
                <BiSolidDownArrowCircle className="text-3xl"></BiSolidDownArrowCircle>
                <p className="text-2xl">{leftlikeCount}</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
