"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import toast from "react-hot-toast";

export default function TotalPendingDaysCard() {
  const [totalPendingDays, setTotalPendingDays] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPendingDays = async () => {
      try {
        const res = await fetch(`${apiUrl}/report/pending`);
        const data = await res.json();
        console.log(data);
        const pendingTask = data?.pendingTasks;
        console.log(pendingTask);

        if(pendingTask && pendingTask.length > 0){
          const response = pendingTask.map((task)=>task.name);
          console.log(response);
           setPendingTasks(response);
        }

        setTotalPendingDays(data.totalPendingDays || 0);
      } catch (error) {
        toast.error("Failed to fetch pending work days");
      }
    };

    fetchPendingDays();
  }, [apiUrl]);

  const bgColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-red-100 text-red-700",
  "bg-purple-100 text-purple-700",
];


  return (
    <div className="bg-white rounded-xl p-5 flex flex-col">
        {/* Top row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Pending Work</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {totalPendingDays} Days
          </h2>
        </div>

        <div className="bg-indigo-100 p-3 rounded-full">
          <CalendarClock className="text-indigo-600 w-6 h-6" />
        </div>
      </div>

      {/* Pending task names */}
      <div className="mt-4 flex flex-wrap gap-2">
        {pendingTasks.slice(0, 6).map((task, index) => (
          <span
            key={index}
            className={`text-xs font-medium px-3 py-1 rounded-full cursor-pointer  ${
              bgColors[index % bgColors.length]
            }`}
          >
            {task}
          </span>
        ))}
      </div>
    </div>
  );
}
