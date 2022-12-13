import React, { useState, useEffect } from "react";
import "./Profile.css";
import { apiURL } from "./../../utils/constants";
// components
import Header from "./../../components/Header/Header";
import Modal from "./../../components/Modal/Modal";
// images
import Background from "./../../assets/image.jpg";
// containers
import ListQuestion from "./../../containers/ListQuestion/ListQuestion";
// redux
import { useSelector } from "react-redux";
import { authFetch } from "../../authFetch";

const Profile = () => {
  // redux
  const authUser = useSelector((state) => state.auth);
  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    categoryId: null,
  });
  const [categories, setCategories] = useState([]);

  const onChange = ({ target: { name, value } }) => {
    setQuestion({ ...question, [name]: value });
  };

  function handleOnClick() {
    console.log(question);
    authFetch(
      `${apiURL}/questions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      },
      authUser.dataUser.token
    )
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setIsOpenModal(false);
      });
  }

  useEffect(() => {
    fetch(`${apiURL}/categories`)
      .then((response) => response.json())
      .then((actualData) => {
        const categories = actualData.map((item) => {
          const data = {
            ...item,
            state: false,
          };
          return data;
        });
        categories[0].state = true;
        console.log(categories);
        setCategories(categories);
        setQuestion({ ...question, categoryId: categories[0].id });
      });
  }, []);

  return (
    <div className="profile">
      <Header isLogged={authUser.isLogged} />
      <img className="background" src={Background} alt="background" />
      <div className="options-profile">
        <button
          className="btn btn-primary"
          onClick={() => setIsOpenModal(true)}
        >
          Question
        </button>
      </div>
      {isOpenModal && (
        <Modal
          text={"Create question"}
          setIsOpen={setIsOpenModal}
          handleOnClick={handleOnClick}
        >
          <div className="body-modal">
            <div className="categories">
              {categories.map((category, index) => {
                return (
                  <div
                    className="category"
                    style={{
                      backgroundColor: category.state ? "#d37938" : "black",
                    }}
                    key={category.id}
                    onClick={() => {
                      setCategories((current) => {
                        const updatedCategories = [...current];
                        return updatedCategories.map((item, indexUpdate) => {
                          const data = {
                            ...item,
                            state: index !== indexUpdate ? false : true,
                          };
                          return data;
                        });
                      });
                      setQuestion({ ...question, categoryId: category.id });
                    }}
                  >
                    <p>{category.name}</p>
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              name="title"
              placeholder="Enter title..."
              value={question.title}
              onChange={onChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Enter description..."
              value={question.description}
              onChange={onChange}
            />
          </div>
        </Modal>
      )}
      <ListQuestion userId={authUser.dataUser.id} />
    </div>
  );
};

export default Profile;
