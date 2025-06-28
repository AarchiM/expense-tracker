import React, { useEffect, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { useGetAllTransactionMutation } from "../store/transactionApi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Income = () => {
  const [getAllTransaction] = useGetAllTransactionMutation();
  const [tranData, setTranData] = useState();

  const IncomeChart = async () =>
  {
    const userEmail = JSON.parse(localStorage.getItem('email'))
    const result = await getAllTransaction(userEmail);
    const response = result.data.filter(
      (tran) => tran.TransactionType == "income"
    );
    setTranData(response);

    const getRandomBlue = () => {
      return Array.from({ length: 5 }, (_, i) => {
        const hue = 210 + Math.floor(Math.random() * 40); 
        const saturation = 80 + Math.floor(Math.random() * 20); 
        const lightness = 30 + Math.floor(Math.random() * 50); 
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      });
    };
    const data = {
      labels: response.slice(0,5).map((row) => row.TransactionSource),
      datasets: [
        {
          label: "Financial Overview",
          data: response.slice(0,5).map((row) => row.TransactionAmount),
          backgroundColor: getRandomBlue(),
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
    IncomeChart();
  }, []);

  return (
    <div className="p-5 acquisitions flex flex-col lg:flex-row gap-5">
      <div className="lg:w-1/2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-left">Financial Overview</h1>
        <div className="w-1/2 ">
          <canvas id="incomechart" height={100} className="acquisitions"></canvas>
        </div>
      </div>
      <div className="p-5 lg:w-1/2 shadow rounded dark:bg-secondary_dark bg-white">
        <h1 className="p-2 font-bold">Your Income History</h1>
        <hr />
        <div className="flex flex-col p-3">
          {tranData?.slice(0,5)?.map((row) => {
            const date = new Date(row?.createdAt);
            const formatted = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
            });
            return (
              <div className="flex justify-between items-center border-b" key={row._id}>
                <div className="flex gap-3 items-center">
                  <AiOutlineTransaction size={40} />
                  <div>
                    <h1 className="font-bold">{row.TransactionSource}</h1>
                    <p>{formatted}</p>
                  </div>
                </div>
                <h1 className="font-bold flex items-center gap-2 h-1/2 bg-increment dark:text-black rounded-lg px-2">
                  ₹ {row.TransactionAmount} <HiArrowTrendingUp />
                </h1>
              </div>
            );
          })}
        </div>
        {
          tranData?.length>5 ?
        <div className="flex justify-end">
          <Link className="text-blue-500 flex items-center" to={'/income'}>See all<MdKeyboardDoubleArrowRight size={25}/></Link>
        </div>
        :<></>
        }
      </div>
    </div>
  );
};

export default Income;
