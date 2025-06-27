import { useEffect, useState } from 'react';
import './App.css'
import { useGetAddExpenseMutation } from '../store/TransactionApi';

function App()
{
  const [getAddExpense] = useGetAddExpenseMutation();
  const getData = async () =>
  {
    try {
      
      const res = await getAddExpense({
        email: "aarchi@gmail.com",
        ExpenseSource: "Coaching Fees",
        ExpenseAmount: 1800
      }).unwrap();
      console.log("Res: ", res)
      
       
    } catch (error) {
      console.error("Error: ",error);
    }
  }
  useEffect(() =>
  {
    getData();
},[])
  return (
    <div>Hello</div>
  )
}

export default App
