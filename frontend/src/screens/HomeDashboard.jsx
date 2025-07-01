import { useEffect, useState } from "react";
import {Chart} from "chart.js/auto";
import { PiUserCirclePlusThin } from "react-icons/pi";
import Transaction from "../components/Transaction";
import Expenses from "../components/Expenses";
import Income from "../components/Income";
import {
  useGetTransactionAmountMutation
} from "../store/transactionApi.js"
import { useNavigate } from "react-router-dom";


const HomeDashboard = () => {
  const [getTransactionAmount] = useGetTransactionAmountMutation();
  const userName = JSON.parse(localStorage.getItem('name'));
  const userEmail = JSON.parse(localStorage.getItem('email'));
  const navigate = useNavigate();
  const [result, setResult] = useState({
    totalBalance: 0,
    totalExpense: 0,
    totalIncome: 0
  });

  const getData = async () =>
  {
    try {
      const result = await getTransactionAmount(userEmail).unwrap(); 
      setResult(result);
      if (result.totalIncome == 0 && result.totalExpense == 0 && result.totalExpense == 0)
        {
          localStorage.setItem('newUser', JSON.stringify(true))
        }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center p-3">
          <div className="">
            <PiUserCirclePlusThin size={40} />
          </div>
          <p>Hello {userName}, Welcome</p>
        </div>
        {/* <hr className="border border-[1px solid red]" /> */}
        <div className="flex justify-between gap-6 p-5 ">
          <div className="p-5 items-center flex flex-col w-1/3 shadow dark:bg-[var(--secondary_dark)] bg-white rounded-lg">
            <h1>Total Income</h1>
            <p>INR {result?.totalIncome}</p>
          </div>
          <div className="p-5 items-center flex flex-col w-1/3 shadow dark:bg-[var(--secondary_dark)] bg-white rounded-lg">
            <h1>Total Expenses</h1>
            <p>INR {result?.totalExpense}</p>
          </div>
          <div className="p-5 items-center flex flex-col w-1/3 shadow dark:bg-[var(--secondary_dark)] bg-white rounded-lg">
            <h1>Current Balance</h1>
            <p>INR {result?.totalBalance}</p>
          </div>
        </div>

        {(result.totalExpense !== 0 && result.totalIncome !== 0) && <div>
          <Transaction />
        </div>}
        {result.totalExpense != 0 &&
          <div>
            <Expenses />
          </div>}
        {result.totalIncome != 0 &&
          <div>
            <Income />
          </div>}

        {
          (result.totalIncome == 0 && result.totalExpense == 0 && result.totalExpense == 0) &&
          <div className="text-center p-6 bg-[var(--creambg)] dark:bg-[var(--primary_dark)] rounded shadow">
            <h2 className="text-2xl font-bold text-[var(--primary_blue)] dark:text-[var(--creambg)] mb-2">
              Welcome to ExpenseFlow, your personal finance assistant!
            </h2>
            <p className="text-[var(--secondary_dark)] dark:text-[var(--border_light)] mb-4">
              You haven't added any income or expenses yet. Let's get started and take control of your money.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 bg-[var(--primary_blue)] text-white rounded hover:bg-[var(--decrement)] transition"
                onClick={() => navigate('/income')}
              >
                + Add Income
              </button>
              <button
                className="px-4 py-2 bg-[var(--primary_blue)] text-white rounded hover:bg-[var(--increment)] transition"
                onClick={() => navigate('/expenses')}
              >
                + Add Expense
              </button>
            </div>
          </div>
        } 
      </div>
    </div>
  );
};

export default HomeDashboard;
