import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://mmasai-default-rtdb.firebaseio.com/Users.json")
      .then((response) => response.json())
      .then((result) => {
        const data = Object.values(result);

        // Sort users by date with today's exams on top, then yesterday, then older
        const sortedData = data.sort((a, b) => {
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);

          const dateA = new Date(a.dateOfExam);
          const dateB = new Date(b.dateOfExam);

          // Check if a/b is today
          const isTodayA =
            dateA.toDateString() === today.toDateString();
          const isTodayB =
            dateB.toDateString() === today.toDateString();

          if (isTodayA && !isTodayB) return -1;
          if (!isTodayA && isTodayB) return 1;

          // Check if a/b is yesterday
          const isYesterdayA =
            dateA.toDateString() === yesterday.toDateString();
          const isYesterdayB =
            dateB.toDateString() === yesterday.toDateString();

          if (isYesterdayA && !isYesterdayB) return -1;
          if (!isYesterdayA && isYesterdayB) return 1;

          // Otherwise sort by recent date (descending)
          return dateB - dateA;
        });

        setUserData(sortedData);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const calculateAnswers = (selectedAnswers) => {
    if (!selectedAnswers || !selectedAnswers.results) {
      return { correctCount: 0, incorrectCount: 0 };
    }

    const correctCount = selectedAnswers.results.filter(
      (result) => result.isCorrect
    ).length;
    const incorrectCount =
      selectedAnswers.results.length - correctCount;
    return { correctCount, incorrectCount };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col pt-4 items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {userData.length > 0 ? (
          userData.map((user, index) => {
            const { correctCount, incorrectCount } =
              calculateAnswers(user.selectedAnswers);

            return (
              <div
                key={index}
                className="border-b border-gray-300 last:border-0 py-4"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <p className="text-gray-800 font-semibold">
                    <span className="font-bold">Name:</span>{" "}
                    {user.name}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    <span className="font-bold">Level:</span>{" "}
                    {user.level}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    <span className="font-bold">Category:</span>{" "}
                    {user.category}
                  </p>
                </div>

                <div className="text-gray-700">
                  <strong>Held on:</strong>{" "}
                  {new Date(user.dateOfExam).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </div>

                <div className="mt-4 text-gray-800 font-semibold">
                  <strong>Correct Answers:</strong> {correctCount}
                </div>
                <div className="mt-2 text-gray-800 font-semibold">
                  <strong>Incorrect Answers:</strong> {incorrectCount}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
