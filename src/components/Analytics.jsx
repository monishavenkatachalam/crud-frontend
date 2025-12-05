import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Analytics() {
  const [users, setUsers] = useState([]);
  const [locationStats, setLocationStats] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);

    const groupByLocation = {};
    response.data.forEach(user => {
      groupByLocation[user.location] = (groupByLocation[user.location] || 0) + 1;
    });

    setLocationStats(groupByLocation);
  };

  return (
    <div className="mt-5">
      <h3 className="text-primary">Analytics Dashboard</h3>

      <div className="mt-3">
        <h5>Total Users: <b>{users.length}</b></h5>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h6 className="text-center">Users by Location (Pie Chart)</h6>
          <Pie 
            data={{
              labels: Object.keys(locationStats),
              datasets: [{
                data: Object.values(locationStats),
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4CAF50", "#9C27B0", "#FF9800"]
              }]
            }}
          />
        </div>

        <div className="col-md-6">
          <h6 className="text-center">Users by Location (Bar Chart)</h6>
          <Bar
            data={{
              labels: Object.keys(locationStats),
              datasets: [{
                label: "Users",
                data: Object.values(locationStats),
                backgroundColor: "#4CAF50"
              }]
            }}
          />
        </div>
      </div>
    </div>
  );
}
