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
  const [search, setSearch] = useState("");
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
      <div className="search">
        <input
          style={{ width: "250px" }}
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="questions">
        {questions
          ?.filter((question) => {
            if (search === "") {
              return question;
            } else if (
              question.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return question;
            }
          })
          .map((question) => {
            return <Question {...question} key={question.id} />;
          })}
      </div>
    </div>
  );
};

export default ListQuestion;
