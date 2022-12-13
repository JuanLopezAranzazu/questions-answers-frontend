import React, { useEffect, useState } from "react";
import "./ListResponse.css";
import { apiURL } from "../../utils/constants";
import { authFetch } from "../../authFetch";
// components
import Response from "../../components/Response/Response";
// redux
import { useSelector } from "react-redux";

const ListResponse = ({ questionId }) => {
  const [answers, setAnswers] = useState([]);
  // redux
  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    authFetch(
      `${apiURL}/questions/${questionId}`,
      null,
      authUser.dataUser.token
    )
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setAnswers(actualData.answers);
      });
  }, []);

  return (
    <div className="list-response">
      {answers &&
        answers.map((response) => {
          return <Response {...response} key={response.id} />;
        })}
    </div>
  );
};

export default ListResponse;
