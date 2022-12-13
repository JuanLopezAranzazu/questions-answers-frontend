import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { apiURL } from "./../../utils/constants";
// components
import Header from "./../../components/Header/Header";
// containers
import ListQuestion from "./../../containers/ListQuestion/ListQuestion";
// redux
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  // redux
  const authUser = useSelector((state) => state.auth);

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
        categories.unshift({ id: null, name: "All", state: true });
        console.log(categories);
        setCategories(categories);
      });
  }, []);

  return (
    <div className="dashboard">
      <Header isLogged={authUser.isLogged} />
      <div className="categories">
        {categories.map((category, index) => {
          return (
            <div
              className="category"
              style={{ backgroundColor: category.state ? "#d37938" : "black" }}
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
                setCategoryId(category.id);
              }}
            >
              <p>{category.name}</p>
            </div>
          );
        })}
      </div>
      <ListQuestion categoryId={categoryId} />
    </div>
  );
};

export default Dashboard;
