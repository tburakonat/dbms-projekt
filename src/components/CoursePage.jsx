import { PlayCircleIcon } from "@heroicons/react/16/solid";
import {
  AcademicCapIcon,
  ArrowPathIcon,
  AtSymbolIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CoursePage() {
  const [records, setRecords] = useState([]);
  const params = useParams();
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(
          `http://localhost:5050/course/${params.id.toString()}`
        );
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        setRecords(records);
      } catch (error) {
        console.error(error.message);
      }
    }
    getRecords();
  }, []);

  const lectures = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="mx-auto max-w-7xl p-2 lg:px-8">
      <div>
        <h1 className="text-lg pt-10 text-gray-900 dark:text-slate-400">
          Welcome to
        </h1>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
          {records.name}
        </h1>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <div className="text-lg font-bold dark:text-slate-200">
              Watch the latest Lecture
            </div>
            <div className="group p-1 mt-2 rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-800 dark:hover:bg-sky-900">
              <div className="flex border rounded-lg h-80 bg-gray-900 items-center justify-center">
                <PlayCircleIcon className="text-white w-20 h-20"></PlayCircleIcon>
              </div>
              <div className="line-clamp-2 font-bold dark:text-slate-200 group-hover:text-sky-400">
                Graphenalgorithmen Tiefensuche, Breitensuche und Dijkstra
                aaaaaaaaaaaaaa
              </div>
              <div className="flex justify-between text-sm dark:text-slate-400">
                <div>Views: 60</div>
                <div>12h ago</div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold dark:text-slate-200">
              Course Information
            </h1>
            <div className="flex flex-col pt-2 gap-y-2">
              <div className="flex p-4 gap-x-4 bg-gray-50 dark:bg-slate-800 dark:text-slate-200 items-center rounded-lg">
                <AcademicCapIcon className="h-6 w-6" />
                <div className="">
                  Lectured by: <span className="font-bold">Prof. Maier</span>
                </div>
              </div>
              <div className="flex p-4 gap-x-4 bg-gray-50 dark:bg-slate-800 dark:text-slate-200  items-center rounded-lg">
                <AtSymbolIcon className="h-6 w-6" />
                <div className="">
                  Contact:{" "}
                  <span className="font-bold">maier@uni-frankfurt.de</span>
                </div>
              </div>
              <div className="flex p-4 gap-x-4 bg-gray-50 dark:bg-slate-800 dark:text-slate-200  items-center rounded-lg">
                <CalendarDaysIcon className="h-6 w-6" />
                <div className="">
                  Lecturing days: <span className="font-bold">Tue, Thu</span>
                </div>
              </div>
              <div className="flex p-4 gap-x-4 bg-gray-50 dark:bg-slate-800 dark:text-slate-200  items-center rounded-lg">
                <ArrowPathIcon className="h-6 w-6" />
                <div className="">
                  Last Updated: <span className="font-bold">23h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-lg font-bold dark:text-slate-200">
          All Lectures
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-10">
          {lectures.map((lecture) => (
            <div className="group p-1 rounded-lg h-60 cursor-pointer bg-gray-50 dark:bg-slate-800 dark:hover:bg-sky-900">
              <div className="flex border rounded-lg h-40 bg-gray-900 items-center justify-center">
                <PlayCircleIcon className="text-white w-20 h-20"></PlayCircleIcon>
              </div>
              <div className="line-clamp-2 font-bold dark:text-slate-200 group-hover:text-sky-400">
                Graphenalgorithmen Tiefensuche, Breitensuche und Dijkstra
                aaaaaaaaaaaaaa
              </div>
              <div className="flex justify-between text-sm dark:text-slate-400">
                <div>Views: 60</div>
                <div>12h ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
