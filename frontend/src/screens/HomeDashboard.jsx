import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { PiUserCirclePlusThin } from "react-icons/pi";
import Transaction from "../components/Transaction";
import Expenses from "../components/Expenses";
import Income from "../components/Income";
import {
  useGetTransactionAmountMutation
} from "../store/transactionApi.js"


const HomeDashboard = () => {
  const [getTransactionAmount] = useGetTransactionAmountMutation();
  const heading = "Total Expense";
  const [result, setResult] = useState();
  
  const BarChartJs = () => {
    const data = [
      { income: 2010, date: "12/04/2025" },
      { income: 1020, date: "12/04/2025" },
      { income: 150, date: "12/04/2025" },
      { income: 2025, date: "12/04/2025" },
      { income: 3022, date: "12/04/2025" },
      { income: 2030, date: "12/04/2025" },
      { income: 600, date: "12/04/2025" },
      { income: 2010, date: "12/04/2025" },
      { income: 1020, date: "12/04/2025" },
      { income: 150, date: "12/04/2025" },
      { income: 2025, date: "12/04/2025" },
      { income: 3022, date: "12/04/2025" },
      { income: 2030, date: "12/04/2025" },
      { income: 600, date: "12/04/2025" },
      { income: 2010, date: "12/04/2025" },
      { income: 1020, date: "12/04/2025" },
      { income: 150, date: "12/04/2025" },
      { income: 2025, date: "12/04/2025" },
      { income: 3022, date: "12/04/2025" },
      { income: 2030, date: "12/04/2025" },
      { income: 600, date: "12/04/2025" },
    ];

    new Chart(document.getElementById("bar-expenses"), {
      type: "bar",
      data: {
        labels: data.map((row) => row.date),
        datasets: [
          {
            label: heading,
            data: data.map((row) => row.income),
            backgroundColor: ["rgb(56, 44, 142)"],
          },
        ],
      },
    });
  };

  const PieChart = async () => {
    const result = await getTransactionAmount("aarchi@gmail.com").unwrap(); 
    setResult(result);
    const data = {
      labels: ["Balance", "Income", "Expenses"],
      datasets: [
        {
          label: "Financial Overview",
          data: [result.totalBalance, result.totalIncome, result.totalExpense],
          backgroundColor: [
            "rgb(30, 16, 93)",
            "rgb(21, 42, 181)",
            "rgb(95, 77, 168)",           
          ],
          hoverOffset: 4,
        },
      ],
    };
    new Chart(document.getElementById("acquisitions"), {
      type: "doughnut",
      data: data,
    });
  };

  const IncomeChart = () => {
    const data = {
      labels: ["Balance", "Income", "Expenses"],
      datasets: [
        {
          label: "Financial Overview",
          data: [300, 50, 100, 200],
          backgroundColor: [
            "rgb(30, 16, 93)",
            "rgb(21, 42, 181)",
            "rgb(95, 77, 168)",
            "rgb(182, 180, 236)",   
          ],
          hoverOffset: 4,
        },
      ],
    };
    new Chart(document.getElementById("incomechart"), {
      type: "doughnut",
      data: data,
    });
  };

  useEffect(() => {
    PieChart();
    BarChartJs();
    IncomeChart()
  }, []);


  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center p-3">
          <div className="">
            <PiUserCirclePlusThin size={40} />
          </div>
          <p>Hello Aarchi, Welcome</p>
        </div>
        {/* <hr className="border border-[1px solid red]" /> */}
        <div className="flex justify-between gap-6 p-5 ">
          <div className="p-5 items-center flex flex-col items-center w-1/3 shadow dark:bg-secondary_dark bg-white rounded-lg">
            <h1>Total Income</h1>
            <p>INR {result?.totalIncome}</p>
          </div>
          <div className="p-5 items-center flex flex-col items-center w-1/3 shadow dark:bg-secondary_dark bg-white rounded-lg">
            <h1>Total Expenses</h1>
            <p>INR {result?.totalExpense}</p>
          </div>
          <div className="p-5 items-center flex flex-col items-center w-1/3 shadow dark:bg-secondary_dark bg-white rounded-lg">
            <h1>Current Balance</h1>
            <p>INR {result?.totalBalance}</p>
          </div>
        </div>
        <div>
          <Transaction />
        </div>
        <div>
          <Expenses />
        </div>
        <div>
          <Income />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
