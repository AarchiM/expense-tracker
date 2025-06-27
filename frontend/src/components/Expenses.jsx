import React from "react";

import { AiOutlineTransaction } from "react-icons/ai";
import { HiArrowTrendingDown } from "react-icons/hi2";

const Expenses = () => {
  return (
    <div className="p-5 acquisitions flex flex-col lg:flex-row gap-5">
      <div className="p-5 lg:w-1/2 shadow rounded bg-white dark:bg-secondary_dark">
        <h1 className="p-2 font-bold">Last 30 days Expanses</h1>
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
