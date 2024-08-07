import { useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { API_BASE_URL } from "../config";

export default function QuizListPage() {
  const { user } = useAuth();
  const [quizzesInfo, setQuizzesInfo] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const noQuizzes =
    dataLoaded &&
    (Object.keys(quizzesInfo).length === 0 ||
      Object.values(quizzesInfo).every(
        ({ lectureInfo }) => lectureInfo.length === 0
      ));

  const noQuizzesMessage =
    user.role === "teacher"
      ? "You don't seem to be teaching any courses, or your courses don't contain any lectures. Create a lecture so you can begin adding Quiz questions."
      : "No quizzes available. Watch a lecture to unlock the lecture's quiz (note: some lectures may not have an accompanying quiz).";

  useEffect(() => {
    async function getQuizzesInfo() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/quizzes?userId=${user.userId}`
        );
        const data = await response.json();
        setQuizzesInfo(data);
        setDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    getQuizzesInfo();
  }, []);

  return (
    <div className="flex flex-col ml-4 dark:text-slate-200">
      <div className="pt-10 flex items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quizzes Overview
        </h1>
      </div>
      {dataLoaded && noQuizzes && <p className="mt-2">{noQuizzesMessage}</p>}
      {!dataLoaded && (
        <p className="mt-2 dark:text-white">Loading quizzes...</p>
      )}
      <ul role="list" className="flex flex-col grow gap-y-2 pt-5">
        {quizzesInfo &&
          Object.entries(quizzesInfo).map(([courseName, info]) => {
            const lectureInfo = info?.lectureInfo;
            return (
              lectureInfo &&
              lectureInfo.length > 0 && (
                <div key={courseName}>
                  <h2 className="text-xl font-bold pb-3">{courseName}</h2>
                  {info?.lectureInfo?.map((lecture) => (
                    <Link
                      to={`/courses/${info.courseId}/lectures/${lecture.id}/${
                        user.role === "teacher" ? "manageQuiz" : "quiz"
                      }`}
                      key={lecture.id}
                      className="flex cursor-pointer group rounded-lg p-5 bg-gray-50 hover:bg-gray-200 justify-between dark:hover:bg-sky-900 dark:bg-slate-800"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="flex min-w-0 gap-3">
                          <p className="text-lg font-semibold leading-6 text-gray-900 dark:text-slate-200">
                            {lecture.title}
                          </p>
                          <PencilSquareIcon className="size-6 dark:text-slate-200" />
                        </div>
                      </div>
                      <div className="flex gap-x-6">
                        <div className="flex flex-col items-end">
                          <p className="text-sm leading-6 text-gray-900 dark:text-slate-400">
                            {lecture.numQuestions} questions
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {info?.lectureInfo?.length === 0 &&
                    user.role === "teacher" && (
                      <div className="flex flex-col gap-2">
                        <p>
                          This course currently has no lectures. A quiz must be
                          associated with a lecture.
                        </p>
                        <Link
                          to={`/courses/${info.courseId}/lectures/create`}
                          key={`${info.courseId}-create`}
                          className="mt-3 text-blue-500 hover:text-blue-600 "
                        >
                          Create Lecture for {courseName}
                        </Link>
                      </div>
                    )}
                </div>
              )
            );
          })}
      </ul>
    </div>
  );
}
