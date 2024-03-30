import React, { useEffect, useState } from 'react'
import './index.css'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState([])
  const [total, setTotal] = useState(0)
  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [incomeName, setIncomeName] = useState('')
  const [incomeAmount, setIncomeAmount] = useState('')
  const [editingExpenseId, setEditingExpenseId] = useState(null)
  const [editingIncomeId, setEditingIncomeId] = useState(null)

  const baseUrl = 'http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:8000'

  useEffect(() => {
    fetchExpenses()
    fetchIncome()
    fetchTotal()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${baseUrl}/expenses`)
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }

  const fetchIncome = async () => {
    try {
      const response = await fetch(`${baseUrl}/income`)
      const data = await response.json()
      setIncome(data)
    } catch (error) {
      console.error('Error fetching income:', error)
    }
  }

  const fetchTotal = async () => {
    try {
      const response = await fetch(`${baseUrl}/total`)
      const data = await response.json()
      setTotal(data.total)
    } catch (error) {
      console.error('Error fetching total:', error)
    }
  }

  const handleAddExpense = async e => {
    e.preventDefault()
    try {
      await fetch(`${baseUrl}/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expense_name: expenseName,
          amount: parseFloat(expenseAmount)
        })
      })
      setExpenseName('')
      setExpenseAmount('')
      fetchExpenses()
      fetchTotal()
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const handleAddIncome = async e => {
    e.preventDefault()
    try {
      await fetch(`${baseUrl}/add-income`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          income_name: incomeName,
          amount: parseFloat(incomeAmount)
        })
      })
      setIncomeName('')
      setIncomeAmount('')
      fetchIncome()
      fetchTotal()
    } catch (error) {
      console.error('Error adding income:', error)
    }
  }

  const handleDeleteExpense = async id => {
    try {
      await fetch(`${baseUrl}/delete-expense/${id}`, {
        method: 'DELETE'
      })
      fetchExpenses()
      fetchTotal()
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const handleDeleteIncome = async id => {
    try {
      await fetch(`${baseUrl}/delete-income/${id}`, {
        method: 'DELETE'
      })
      fetchIncome()
      fetchTotal()
    } catch (error) {
      console.error('Error deleting income:', error)
    }
  }

  const handleEditExpense = async (id, newName, newAmount) => {
    try {
      await fetch(`${baseUrl}/update-expense/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expense_name: newName,
          amount: parseFloat(newAmount)
        })
      })
      fetchExpenses()
      fetchTotal()
    } catch (error) {
      console.error('Error updating expense:', error)
    } finally {
      setEditingExpenseId(null)
    }
  }

  const handleEditIncome = async (id, newName, newAmount) => {
    try {
      await fetch(`${baseUrl}/update-income/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          income_name: newName,
          amount: parseFloat(newAmount)
        })
      })
      fetchIncome()
      fetchTotal()
    } catch (error) {
      console.error('Error updating income:', error)
    } finally {
      setEditingIncomeId(null)
    }
  }

  return (
    <div className='container'>
      <h1 className='heading'>Expense Tracker</h1>
      <div className='section'>
        <h2 className='sub-heading'>Expenses</h2>
        <ul className='list'>
          {expenses.map(expense => (
            <li key={expense.id} className='item'>
              {editingExpenseId === expense.id ? (
                <>
                  <input
                    type='text'
                    value={expenseName}
                    onChange={e => setExpenseName(e.target.value)}
                    className='input-field'
                  />
                  <input
                    type='number'
                    value={expenseAmount}
                    onChange={e => setExpenseAmount(e.target.value)}
                    className='input-field'
                  />
                  <button
                    className='btn'
                    onClick={() =>
                      handleEditExpense(expense.id, expenseName, expenseAmount)
                    }
                  >
                    Save
                  </button>
                  <button
                    className='btn-danger mx-normal'
                    onClick={() => setEditingExpenseId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {expense.expense_name}: {expense.amount}
                  <button
                    className='btn-danger mx-normal'
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    <RiDeleteBin5Line />
                  </button>
                  <button
                    className='btn mx-normal'
                    onClick={() => {
                      setExpenseName(expense.expense_name)
                      setExpenseAmount(expense.amount)
                      setEditingExpenseId(expense.id)
                    }}
                  >
                    <FiEdit />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddExpense}>
          <input
            type='text'
            placeholder='Expense Name'
            value={!editingExpenseId ? expenseName : ''}
            onChange={e => setExpenseName(e.target.value)}
            required
            className='input-field'
          />
          <input
            type='number'
            placeholder='Expense Amount'
            value={!editingExpenseId ? expenseAmount : ''}
            onChange={e => setExpenseAmount(e.target.value)}
            required
            className='input-field'
          />
          <button type='submit' className='btn'>
            Add Expense
          </button>
        </form>
      </div>
      <div className='section'>
        <h2 className='sub-heading'>Income</h2>
        <ul className='list'>
          {income.map(incomeItem => (
            <li key={incomeItem.id} className='item'>
              {editingIncomeId === incomeItem.id ? (
                <>
                  <input
                    type='text'
                    value={incomeName}
                    onChange={e => setIncomeName(e.target.value)}
                    className='input-field'
                  />
                  <input
                    type='number'
                    value={incomeAmount}
                    onChange={e => setIncomeAmount(e.target.value)}
                    className='input-field'
                  />
                  <button
                    className='btn'
                    onClick={() =>
                      handleEditIncome(incomeItem.id, incomeName, incomeAmount)
                    }
                  >
                    Save
                  </button>
                  <button
                    className='btn-danger mx-normal'
                    onClick={() => setEditingIncomeId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {incomeItem.income_name}: {incomeItem.amount}
                  <button
                    className='btn-danger mx-normal'
                    onClick={() => handleDeleteIncome(incomeItem.id)}
                  >
                    <RiDeleteBin5Line />
                  </button>
                  <button
                    className='btn mx-normal'
                    onClick={() => {
                      setIncomeName(incomeItem.income_name)
                      setIncomeAmount(incomeItem.amount)
                      setEditingIncomeId(incomeItem.id)
                    }}
                  >
                    <FiEdit />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddIncome}>
          <input
            type='text'
            placeholder='Income Name'
            value={!editingIncomeId ? incomeName : ''}
            onChange={e => setIncomeName(e.target.value)}
            required
            className='input-field'
          />
          <input
            type='number'
            placeholder='Income Amount'
            value={!editingIncomeId ? incomeAmount : ''}
            onChange={e => setIncomeAmount(e.target.value)}
            required
            className='input-field'
          />
          <button type='submit' className='btn'>
            Add Income
          </button>
        </form>
      </div>
      <div className='section'>
        <h2 className='sub-heading'>Total</h2>
        <p className='total-amount'>{total}</p>
      </div>
    </div>
  )
}

export default App
