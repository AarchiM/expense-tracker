import React, { useEffect, useRef, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingUp } from "react-icons/hi2";
import {
  useGetAddIncomeMutation,
  useGetAllTransactionMutation,
} from "../store/transactionApi";
import {Chart} from 'chart.js/auto';

const IncomePage = () => {
  const heading = "Total Income";
  const [result, setResult] = useState();
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [getAllTransaction] = useGetAllTransactionMutation();
  const [getAddIncome] = useGetAddIncomeMutation();
  const chartRef = useRef(null);
  const newUser = localStorage.getItem('newUser');
  const userEmail = JSON.parse(localStorage.getItem('email'))

  const BarChartJs = async () =>
  {
    const response = await getAllTransaction(userEmail);
    const data = response.data.filter(
      (tran) => tran.TransactionType === "income"
    );
    setResult(data);
    if (chartRef.current) {
      chartRef.current.destroy();
    }

  // Create new chart and store reference
    chartRef.current = new Chart(document.getElementById("bar-income-page"), {
      type: "bar",
      data: {
        labels: data.map((row) => {
          const date = new Date(row?.createdAt);
          const formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
          return formatted;
        }),
        datasets: [
          {
            label: heading,
            data: data.map((row) => row.TransactionAmount),
            backgroundColor: ["rgb(56, 44, 142)"],
          },
        ],
      },
    });
  };

  const HandleAddIncome = async () => {
    try {
      if (source !== "" && amount > 0) {
        const res = await getAddIncome({
          email: userEmail,
          IncomeSource: source,
          IncomeAmount: amount,
        });
        localStorage.removeItem('newUser');
      }

      setSource("");
      setAmount(0);
      await BarChartJs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>
  {
    BarChartJs();
  }, []);

  

  return (
    <div className="p-5 acquisitions flex flex-col gap-5">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="font-bold text-left">Income Overview</h1>
        <div className="w-full">
          <canvas id="bar-income-page" height={100} className=""></canvas>
        </div>
      </div>
      <h1 className="p-2 font-bold">Last 30 days Income</h1>
      <div className="p-5 w-full flex md:flex-row flex-col gap-10 md:gap-20">
        {
          result?.length > 0 ?
        <div className="flex flex-col p-5 md:w-2/3 w-full shadow rounded bg-white dark:bg-[var(--secondary_dark)]">
          {result?.map((row) => {
            const date = new Date(row?.createdAt);
            const formatted = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            return (
              <div
                className="flex justify-between items-center border-b"
                key={row._id}
              >
                <div className="flex gap-3 items-center">
                  <AiOutlineTransaction size={40} />
                  <div>
                    <h1 className="font-bold">{row.TransactionSource}</h1>
                    <p>{formatted}</p>
                  </div>
                </div>
                <h1 className="font-bold flex items-center gap-2 dark:text-black h-1/2 bg-[var(--increment)] rounded-lg px-2">
                  ₹ {row.TransactionAmount} <HiArrowTrendingUp />
                </h1>
              </div>
            );
          })}
            </div> :
            <div className="flex flex-col p-5 md:w-2/3 w-full shadow rounded bg-white dark:bg-[var(--secondary_dark)]">
              <p>No Income Data Found</p>
              </div>
        }
        <div className="p-5 md:w-1/3 w-full flex flex-col gap-5 shadow rounded bg-white dark:bg-[var(--secondary_dark)]">
          <div>
            <h1 className="font-bold text-center">..Add Your Income..</h1>
            <hr />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="font-bold">Income Source: </label>
            <input
              className="bg-transparent w-full p-2 border border-gray-700"
              placeholder="Enter here..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <label className="font-bold">Income Amount: </label>
            <input
              className="bg-transparent w-full p-2 border border-gray-700"
              placeholder="Enter here..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-[var(--primary_blue)] text-gray-200 rounded-lg p-2"
              onClick={HandleAddIncome}
            >
              Add Income
            </button>
          </div>
        </div>
        </div>
      
    </div>
  );
};

export default IncomePage;
