import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatus = () => {
  const [taskStatusData, setTaskStatusData] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });

  useEffect(() => {
    // Simulate an API call
    const fetchTaskStatus = async () => {
      const response = await fetch("/api/task-status");
      const data = await response.json(); // Simulate your API data here
      setTaskStatusData({
        completed: data.completed,
        inProgress: data.inProgress,
        notStarted: data.notStarted,
      });
    };
    fetchTaskStatus();
  }, []);

  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [
          taskStatusData.completed,
          taskStatusData.inProgress,
          taskStatusData.notStarted,
        ],
        backgroundColor: ["#28a745", "#007bff", "#dc3545"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="task-status-container p-3">
      <h6>Task Status</h6>
      <Pie data={data} />
    </div>
  );
};

export default TaskStatus;
