import { useEffect, useState } from 'react';
import './App.css'
import Navbar from "./components/Navbar"
import { useGetAddExpenseMutation } from './store/transactionApi.js';
import { Outlet } from 'react-router-dom';

function App()
{
  const [getAddExpense] = useGetAddExpenseMutation();
  const getData = async () =>
  {
    try {
      
      // const res = await getAddExpense({
      //   email: "aarchi@gmail.com",
      //   ExpenseSource: "Coaching Fees",
      //   ExpenseAmount: 1800
      // }).unwrap();
      // console.log("Res: ", res)
      
       
    } catch (error) {
      console.error("Error: ",error);
    }
  }
  useEffect(() =>
  {
    getData();
},[])
  return (
    <div className="text-gray-600 dark:text-gray-300">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
