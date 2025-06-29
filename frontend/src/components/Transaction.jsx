import React, { useEffect, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { useGetAllTransactionMutation, useGetTransactionAmountMutation } from "../store/transactionApi";

const Transaction = () => {
  const [getAllTransaction] = useGetAllTransactionMutation();
  const [getTransactionAmount] = useGetTransactionAmountMutation();
  const [transaction, setTransaction] = useState();
  const userEmail = JSON.parse(localStorage.getItem('email'))
  const heading = "Total Expense";

  const getData = async () => {
    try
    {
      const result = await getAllTransaction(userEmail);
      setTransaction(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const PieChart = async () => {
      const result = await getTransactionAmount(userEmail).unwrap(); 
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
  
    useEffect(() => {
      PieChart();
    }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-5 acquisitions flex flex-col lg:flex-row gap-5">
      <div className="lg:w-1/2 flex flex-col items-center justify-center rounded">
        <h1 className="font-bold text-left">Financial Overview</h1>
        <div className="w-1/2 ">
          <canvas id="acquisitions" height={100} className="acquisitions"></canvas>
        </div>
      </div>
      <div className="p-5 lg:w-1/2 shadow rounded dark:bg-secondary-dark)] bg-white h-[370px]">
        <h1 className="p-2 font-bold">Your Transaction History</h1>
        <hr />
        <div className="flex flex-col p-3 h-[270px] overflow-auto">
          {transaction?.slice(0, 5)?.map((tran) => {
            const date = new Date(tran?.createdAt);
            const formatted = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long'
            })
            return (
              <div className="flex justify-between items-center border-b" key={tran._id}>
                <div className="flex gap-3 items-center">
                  <AiOutlineTransaction size={40} />
                  <div>
                    <h1 className="font-bold">
                      {tran?.TransactionSource}
                    </h1>
                    <p>{formatted}</p>
                  </div>
                </div>
                <h1 className={`font-bold flex items-center gap-2 h-1/2 ${tran?.TransactionType == 'expense' ? "bg-decrement" : "bg-increment"} dark:text-black rounded-lg px-2`}>
                  ₹ {tran?.TransactionAmount} {tran?.TransactionType == 'expense' ? <HiArrowTrendingDown />: <HiArrowTrendingUp/>}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
