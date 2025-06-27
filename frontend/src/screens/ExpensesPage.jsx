import React, { useEffect } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingDown } from "react-icons/hi2";

const ExpensesPage = () => {
  const heading = "Total Income";
  const LineChartJs = () => {
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

    new Chart(document.getElementById("bar-expenses-page"), {
      type: "line",
      data: {
        labels: data.map((row) => row.date),
        datasets: [
          {
            label: heading,
            data: data.map((row) => row.income),
            backgroundColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
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

  useEffect(() => {
    LineChartJs();
  }, []);
  return (
    <div className="p-5 acquisitions flex flex-col gap-5">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="font-bold text-left">Income Overview</h1>
        <div className="w-full">
          <canvas id="bar-expenses-page" height={70} className=""></canvas>
        </div>
      </div>
      <h1 className="p-2 font-bold">Last 30 days Expanses</h1>
      <div className="p-5 w-full  shadow rounded bg-white dark:bg-secondary_dark">
        <hr />
        <div className="flex flex-col p-3">
          <div className="flex justify-between border-b">
            <div className="flex gap-3 items-center">
              <AiOutlineTransaction size={40} />
              <div>
                <h1 className="font-bold">Rent/Home</h1>
                <p>51%</p>
              </div>
            </div>
            <h1 className="font-bold flex items-center gap-2 h-1/2 bg-decrement rounded-lg px-2">
              ₹ 4000 <HiArrowTrendingDown />
            </h1>
          </div>
          <div className="flex justify-between items-center border-b">
            <div className="flex gap-3 items-center">
              <AiOutlineTransaction size={40} />
              <div>
                <h1 className="font-bold">Clothes</h1>
                <p>5%</p>
              </div>
            </div>
            <h1 className="font-bold flex items-center gap-2 h-1/2 bg-decrement rounded-lg px-2">
              ₹ 1000 <HiArrowTrendingDown />
            </h1>
          </div>
        </div>
        <div>
          <button>Add Income</button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
