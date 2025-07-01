import React, { useEffect, useRef, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { useGetAddExpenseMutation, useGetAllTransactionMutation, useGetTransactionAmountMutation } from "../store/transactionApi";
import AlertModal from "../components/AlertModal";
import {Chart} from 'chart.js/auto';

const ExpensesPage = () =>
{
  const heading = "Total Expense";
  const [getTransactionAmount] = useGetTransactionAmountMutation();
  const [detail, setDetail] = useState({
    totalBalance: 0,
    totalExpense: 0,
    totalIncome: 0
  });
  const [result, setResult] = useState([]);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllTransaction] = useGetAllTransactionMutation();
  const [getAddExpense] = useGetAddExpenseMutation();
  const chartRef = useRef(null);
  const userEmail = JSON.parse(localStorage.getItem('email'))

  const getData = async () =>
  {
    try
    {
      const detail = await getTransactionAmount(userEmail).unwrap();
      setDetail(detail);

    } catch (error)
    {
      console.log(error);
    }
  }

  useEffect(() =>
  {
    getData();
  }, []);

  const LineChartJs = async () =>
  {
    const response = await getAllTransaction(userEmail);
    const data = response?.data?.filter(
      (tran) => tran.TransactionType === "expense"
    );
    setResult(data);

    if (chartRef.current)
    {
      chartRef.current.destroy();
    }

    // Creating new chart and storing reference below
    chartRef.current = new Chart(document.getElementById("bar-expenses-page"), {
      type: "line",
      data: {
        labels: data?.map((row) =>
        {
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
            backgroundColor: function (context)
            {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea)
              {
                return null;
              }

              const gradient = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              );
              gradient.addColorStop(1, "rgba(17, 7, 99, 0.9)"); // Dark at bottom
              gradient.addColorStop(0, "rgba(157, 143, 216, 0.9)"); // Light at top
              return gradient;
            },
            tension: 0.1,
            fill: true,
            // showLine: true,
            borderColor: "rgb(56, 44, 142)",
          },
        ],
      },
    });
  };

  const HandleAddExpense = async () =>
  {
    try
    {
      if (source !== "" && amount > 0)
      {        
        if (detail.totalBalance < detail.totalExpense + amount)
        {
          setIsModalOpen(true); 
        }
        const res = await getAddExpense({
          email: userEmail,
          ExpenseSource: source,
          ExpenseAmount: amount,
        });

        localStorage.removeItem('newUser');
      }

      setSource("");
      setAmount(0);
      await LineChartJs();
    } catch (error)
    {
      console.log(error);
    }
  };


  useEffect(() =>
  {
    LineChartJs();
  }, []);
  return (
    <div className="p-5 acquisitions flex flex-col gap-5">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="font-bold text-left">Expense Overview</h1>
        <div className="w-full">
          <canvas id="bar-expenses-page" height={100} className=""></canvas>
        </div>
      </div>
      <h1 className="p-2 font-bold">Last 30 days Expenses</h1>
      <div className="p-5 w-full flex md:flex-row flex-col gap-10 md:gap-20">
        {
          result?.length > 0 ?
            <div className="flex flex-col p-5 md:w-2/3 w-full shadow rounded bg-white dark:bg-[var(--secondary_dark)]">
              {result?.map((row) =>
              {
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
                      ₹ {row.TransactionAmount} <HiArrowTrendingDown />
                    </h1>
                  </div>
                );
              })}
            </div>
            :
            <div className="flex flex-col p-5 md:w-2/3 w-full shadow rounded bg-white dark:bg-[var(--secondary_dark)]">
              <p>No Expense Data Found</p>
            </div>
        }
        <div className="p-5 md:w-1/3 sm:w-full flex flex-col gap-5 shadow rounded bg-white dark:bg-[var(--secondary_dark)]">
          <div>
            <h1 className="font-bold text-center">..Add Your Expense..</h1>
            <hr />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="font-bold">Expense Source: </label>
            <input
              className="bg-transparent w-full p-2 border border-gray-700"
              placeholder="Enter here..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <label className="font-bold">Expense Amount: </label>
            <input
              className="bg-transparent w-full p-2 border border-gray-700"
              placeholder="Enter here..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-[var(--primary_blue)] text-gray-200 rounded-lg p-2"
              onClick={HandleAddExpense}
            >
              Add Expense
            </button>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Heads up! You’ve spent more than your current balance. Time to rebalance your budget for a smoother journey ahead."
      />

    </div>
  );
};

export default ExpensesPage;
