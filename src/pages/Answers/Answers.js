import React, { useState } from "react";
import "./Answers.css";
import { apiURL } from "./../../utils/constants";
// components
import Header from "./../../components/Header/Header";
import Modal from "./../../components/Modal/Modal";
// containers
import ListResponse from "./../../containers/ListResponse/ListResponse";
// redux
import { useSelector } from "react-redux";
import { authFetch } from "../../authFetch";

const Answers = ({ params }) => {
  // redux
  const authUser = useSelector((state) => state.auth);
  // details
  const [isOpen, setIsOpen] = useState(false);
  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [answer, setAnswer] = useState("");

  function handleOnClick() {
    authFetch(
      `${apiURL}/answers`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: answer, questionId: params.id }),
      },
      authUser.dataUser.token
    )
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setIsOpenModal(false);
      });
  }

  return (
    <div className="answers">
      <Header isLogged={authUser.isLogged} />
      <div
        className={!isOpen ? "details show-details" : "details close-details"}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {!isOpen ? (
          <h2>Show details</h2>
        ) : (
          <>
            <h2>Close details</h2>
            <div className="footer-details">
              <button
                className="btn btn-primary"
                onClick={() => setIsOpen(false)}
              >
                Close details
              </button>
            </div>
          </>
        )}
      </div>
      <div className="options-answers">
        <button
          className="btn btn-primary"
          onClick={() => setIsOpenModal(true)}
        >
          Answer
        </button>
      </div>
      {isOpenModal && (
        <Modal
          text={"Answer question"}
          setIsOpen={setIsOpenModal}
          handleOnClick={handleOnClick}
        >
          <div className="body-modal">
            <input
              type="text"
              placeholder="Enter your answer..."
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>
        </Modal>
      )}
      <ListResponse questionId={params.id} />
    </div>
  );
};

export default Answers;
