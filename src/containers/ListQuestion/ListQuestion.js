import React, { useEffect, useState } from "react";
import "./ListQuestion.css";
import { apiURL } from "./../../utils/constants";
import { authFetch } from "./../../authFetch";
// components
import Question from "./../../components/Question/Question";
// redux
import { useSelector } from "react-redux";

const ListQuestion = ({ userId, categoryId }) => {
  const [questions, setQuestions] = useState([]);
  // redux
  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      fetch(`${apiURL}/users/${userId}`)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setQuestions(actualData.questions ? actualData.questions : []);
        });
    } else {
      const url = categoryId
        ? `${apiURL}/questions/category/${categoryId}`
        : `${apiURL}/questions`;
      authFetch(url, null, authUser.dataUser.token)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setQuestions(actualData);
        });
    }
  }, [categoryId]);

  return (
    <div className="list-question">
      {questions.map((question) => {
        return <Question {...question} key={question.id} />;
      })}
    </div>
  );
};

export default ListQuestion;
