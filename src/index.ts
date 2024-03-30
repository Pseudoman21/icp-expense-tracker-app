import { v4 as uuidv4 } from 'uuid';
import { Server, StableBTreeMap, ic } from 'azle';
import express from 'express';

class Expense {
  id: string;
  expense_name: string;
  amount: number;
}

class Income {
  id: string;
  income_name: string;
  amount: number;
}

const expensesStorage = StableBTreeMap<string, Expense>(0);
const incomeStorage = StableBTreeMap<string, Income>(1);

export default Server(() => {
  const app = express();
  app.use(express.json());

  app.get("/expenses", (req, res) => {
    res.json(expensesStorage.values());
  });

  app.get("/income", (req, res) => {
    res.json(incomeStorage.values());
  });

  app.post("/add-expense", (req, res) => {
    const expense: Expense = { id: uuidv4(), ...req.body };
    expensesStorage.insert(expense.id, expense);
    res.json(expense);
  });

  app.post("/add-income", (req, res) => {
    const income: Income = { id: uuidv4(), ...req.body };
    incomeStorage.insert(income.id, income);
    res.json(income);
  });

  app.delete("/delete-expense/:id", (req, res) => {
    const id = req.params.id;
    expensesStorage.remove(id);
    const expenses = expensesStorage.values()
    res.json({ expenses, message: "success" });
  });

  app.put("/update-expense/:id", (req, res) => {
    const id = req.params.id;
    const newExpense: Expense = { id, ...req.body };
    expensesStorage.insert(id, newExpense);
    res.json(newExpense);
  });

  app.put("/update-income/:id", (req, res) => {
    const id = req.params.id;
    const newIncome: Income = { id, ...req.body };
    incomeStorage.insert(id, newIncome);
    res.json(newIncome);
  });

  app.get("/total", (req, res) => {
    const totalIncome = getTotalAmount(incomeStorage.values());
    const totalExpenses = getTotalAmount(expensesStorage.values());
    const total = totalIncome - totalExpenses;
    res.json({ total, totalIncome, totalExpenses, message: "success" });
  });

  return app.listen();
});

function getTotalAmount(items: Expense[] | Income[]): number {
  return items.reduce((total, item) => total + item.amount, 0);
}
