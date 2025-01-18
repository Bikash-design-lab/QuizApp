import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const formDetails = { name: "", category: "", level: "", questions: "" };
  const [data, setData] = useState(formDetails);
  const [formSubmit, setFormSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.category || !data.level || !data.questions) {
      alert("Please fill out all the fields before proceeding.");
    } else {
      try {
        const dateOfExam = new Date().toISOString();

        const preParedData = {
          ...data,
          questions: Number(data.questions),
          dateOfExam,
        };

        setFormSubmit(true); // disable button while form is being submitted
        const response = await axios.post(
          "https://mmasai-default-rtdb.firebaseio.com/Users.json",
          preParedData
        );

        // Reset form after submission
        setData(formDetails);

        if (response.status === 200) {
          const userId = response.data.name;
          navigate(`/Quiz/${userId}`);
        }
      } catch (error) {
        console.log("Fails to post user form : ", error);
        alert(
          "There was an issue submitting your data. Please try again later."
        );
      } finally {
        setFormSubmit(false); // re-enable the button after the request is completed
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7092596/pexels-photo-7092596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-5xl text-center text-blue-800 my-8">
        Welcome to the Quiz!
      </h1>

      <div className="flex justify-center mt-10">
        <div className="border-4 w-96 p-8 rounded-lg shadow-xl bg-gradient-to-r from-blue-100 to-purple-200">
          <h3 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
            Fill out the details to start the quiz 🤩
          </h3>

          <div className="mb-4">
            <label className="text-lg text-blue-600 font-semibold">
              Name:{" "}
            </label>
            <input
              className="w-full p-2 mt-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-lg text-blue-600 font-semibold">
              Select Category:{" "}
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full p-2 mt-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Politics">Politics</option>
              <option value="General Knowledge">General Knowledge</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-lg text-blue-600 font-semibold">
              Select Level:{" "}
            </label>
            <select
              name="level"
              value={data.level}
              onChange={handleChange}
              className="w-full p-2 mt-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a level</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-lg text-blue-600 font-semibold">
              Number of Questions:{" "}
            </label>
            <input
              name="questions"
              value={data.questions}
              onChange={handleChange}
              className="w-full p-2 mt-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="Enter number of questions"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleFormSubmit}
              disabled={formSubmit}
              className={`w-full py-2 px-4 text-white font-bold rounded-md ${
                formSubmit ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-600"
              } transform transition duration-300 hover:scale-105`}
            >
              {formSubmit ? "Starting Quiz..." : "Start Quiz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
