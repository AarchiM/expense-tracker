import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    ExpenseSource: {
        type: String,
        required: true,
    },
    ExpenseAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const IncomeSchema = new mongoose.Schema({
    IncomeSource: {
        type: String,
        required: true,
    },
    IncomeAmount: {
        type: Number,
        required: true,
    },
},{ timestamps: true})

const UserDetailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    income: [IncomeSchema],
    expense: [ExpenseSchema]
}, {timestamps: true})

const Income_Expenses = mongoose.model("Income_Expenses", UserDetailSchema);

export default Income_Expenses;