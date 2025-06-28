import React, { useEffect, useState } from "react";

import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingDown, HiMiniArrowTrendingUp } from "react-icons/hi2";
import { useGetAllTransactionMutation } from "../store/transactionApi";
import { Chart } from "chart.js";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Expenses = () => {
  const [getAllTransaction] = useGetAllTransactionMutation();
  const [transactions, setTransactions] = useState();
  const userEmail = JSON.parse(localStorage.getItem('email'))
  
  const BarChartJs = async () =>
  {
    const result = await getAllTransaction(userEmail);
    setTransactions(result.data);
    const response = result?.data?.filter(
      (row) => row.TransactionType == "expense"
    );

    new Chart(document.getElementById("bar-expenses"), {
      type: "bar",
      data: {
        labels: response?.map((row) => {
          const date = new Date(row?.createdAt);
          const formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
          });
          return formatted;
        }),
        datasets: [
          {
            label: "Total Expense",
            data: response?.map((row) => row.TransactionAmount),
            backgroundColor: ["rgb(56, 44, 142)"],
          },
        ],
      },
    });
  };

  useEffect(() => {
    BarChartJs();
  }, []);

  console.log("transactions: ",typeof transactions);
  // console.log("transactions: ",transactions.length);
  

  return (
    <div className="p-5 acquisitions flex flex-col lg:flex-row gap-5">
      <div className="p-5 lg:w-1/2 shadow rounded bg-white dark:bg-secondary_dark">
        <h1 className="p-2 font-bold">Last 30 days Expanses</h1>
        <hr />
        <div className="flex flex-col p-3">
          {transactions
            ?.filter((row) => row.TransactionType == "expense")
            ?.slice(0, 5)
            .map((tran) => {
              return (
                <div
                  className="flex justify-between items-center border-b"
                  key={tran._id}
                >
                  <div className="flex gap-3 items-center">
                    <AiOutlineTransaction size={40} />
                    <div>
                      <h1 className="font-bold">{tran.TransactionSource}</h1>
                      <p>51%</p>
                    </div>
                  </div>
                  <h1 className="font-bold flex items-center dark:text-black gap-2 h-1/2 bg-decrement rounded-lg px-2">
                    ₹ {tran.TransactionAmount} <HiArrowTrendingDown />
                  </h1>
                </div>
              );
            })}
        </div>
        {
          transactions?.length > 5 ?
           <div className="flex justify-end">
          <Link className="text-blue-500 flex items-center" to={"/expenses"}>
            See all
            <MdKeyboardDoubleArrowRight size={25} />
          </Link>
        </div>
        : <></>
        }
      </div>
      <div className="lg:w-1/2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-left">Your Expanses</h1>
        <div className="w-full">
          <canvas id="bar-expenses" className="h-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
