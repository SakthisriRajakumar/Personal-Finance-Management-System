import React, { useContext, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import "./Dashboard.css";
import { UserContext } from "./UserContext";
import { TransactionContext } from "./TransactionContext";

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const { transactions } = useContext(TransactionContext);
  const [totalSpent, setTotalSpent] = useState(0);
  const [balance, setBalance] = useState(0);
  const [weeklySpent, setWeeklySpent] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(0);

  useEffect(() => {
    calculateFinancials();
  }, [transactions]);

  const calculateFinancials = () => {
    const totalIncome = transactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const totalExpenses = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const now = new Date();
    const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const spentThisWeek = transactions
      .filter((txn) => txn.type === "expense" && new Date(txn.date) >= oneWeekAgo)
      .reduce((sum, txn) => sum + txn.amount, 0);

    const spentThisMonth = transactions
      .filter((txn) => txn.type === "expense" && new Date(txn.date) >= oneMonthAgo)
      .reduce((sum, txn) => sum + txn.amount, 0);

    setTotalSpent(totalExpenses);
    setBalance(totalIncome - totalExpenses);
    setWeeklySpent(spentThisWeek);
    setMonthlySpent(spentThisMonth);
  };

  const categoryData = transactions.reduce((categories, txn) => {
    if (txn.type === "expense") {
      categories[txn.category] = (categories[txn.category] || 0) + txn.amount;
    }
    return categories;
  }, {});

  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const barData = {
    labels: ["Weekly Spent", "Monthly Spent", "Total Spent"],
    datasets: [
      {
        label: "Expenses (₹)",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        data: [weeklySpent, monthlySpent, totalSpent],
      },
    ],
  };

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}</h1>
      <div className="financial-summary">
        <div className="summary-box">
          <h2>Total Balance</h2>
          <p>₹{balance.toFixed(2)}</p>
        </div>
        <div className="summary-box">
          <h2>Total Spent</h2>
          <p>₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="summary-box">
          <h2>Spent This Week</h2>
          <p>₹{weeklySpent.toFixed(2)}</p>
        </div>
        <div className="summary-box">
          <h2>Spent This Month</h2>
          <p>₹{monthlySpent.toFixed(2)}</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart">
          <h3>Spending Trends</h3>
          <Bar data={barData} />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
