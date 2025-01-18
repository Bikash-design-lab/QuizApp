import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://mmasai-default-rtdb.firebaseio.com/Users.json")
      .then((response) => response.json())
      .then((result) => {
        const data = Object.values(result);
        setUserData(data);
      })
      .catch((error) => console.log("Error fetching leaderboard data", error));
  }, []);

  const calculateAnswers = (results) => {
    if (!results) return { correctCount: 0, incorrectCount: 0 };
    const correctCount = results.filter((result) => result.isCorrect).length;
    const incorrectCount = results.length - correctCount;
    return { correctCount, incorrectCount };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            LeaderBoard
          </h1>
        </div>

        <div className="space-y-6">
          {userData.length > 0 ? (
            userData.map((user, index) => {
              const { correctCount, incorrectCount } = calculateAnswers(
                user.selectedAnswers?.results
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-900">
                          {user.name}
                        </h2>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">
                        Level: {user.level}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <span className="text-gray-700 font-medium">
                          Category: {user.category}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Exam Date:{" "}
                        {new Date(user.dateOfExam).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-600 font-medium">
                          Correct Answers
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          {correctCount}
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-sm text-red-600 font-medium">
                          Incorrect Answers
                        </div>
                        <div className="text-2xl font-bold text-red-700">
                          {incorrectCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-32 bg-white rounded-xl shadow">
              <div className="animate-pulse flex space-x-4">
                <div className="h-6 w-32 bg-slate-200 rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
